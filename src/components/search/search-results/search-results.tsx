import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  activeBookKeySelector,
  isSearchPendingSelector,
  searchQuerySelector,
  searchResponseSelector
} from "#src/js/redux/selectors";
import SpinnerWrapper from "#components/spinner-wrapper/spinner-wrapper";
import {ActiveBookActions} from "#src/js/redux/reducers/slices/active-book-slice";
import BookCard from "#components/book-card/book-card";
import calculatePagesInfo, {PagesInfo} from "#src/js/util/page-calculator";
import {Operations} from "#src/js/redux/operations/operations";

const SearchResults: FC = () => {
  const dispatch = useDispatch();

  const response = useSelector(searchResponseSelector);
  const isPending = useSelector(isSearchPendingSelector);
  const activeBookKey = useSelector(activeBookKeySelector);
  const searchQuery = useSelector(searchQuerySelector);

  const [pagesInfo, setPagesInfo] = useState<PagesInfo>(undefined);
  const [lastVisibleElement, setLastVisibleElement] = useState<Element>(undefined);

  const observer = useRef<IntersectionObserver>();
  const lastBookElementRef = useCallback((element: HTMLInputElement | null) => {
    if (isPending) return;
    if (observer?.current)
      observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Элемент виден
        if (searchQuery && pagesInfo.hasMore) {
          setLastVisibleElement(entries[0].target);
          dispatch(Operations.sendAppendingRequest({
            search: searchQuery,
            page: pagesInfo.currentPage + 1
          }));
        }
      }
    });
    if (element)
      observer.current.observe(element);
  }, [dispatch, isPending, pagesInfo, searchQuery]);

  useEffect(() => {
    if (response && !isPending) {
      setPagesInfo(calculatePagesInfo(response.start, response.numFound));
      lastVisibleElement?.scrollIntoView();
    }
  }, [response, isPending, lastVisibleElement]);


  return (
    <div className={`BooksList`}>
      <SpinnerWrapper
        loading={isPending}
        isError={!isPending && (response === null || response?.numFound === 0)}
        errorText={`No results`}
      >
        {response?.docs?.map((book, index) => {
          return (
            <BookCard
              key={`${book.key}-searchResult`}
              className={`BooksList-card ${(activeBookKey === book.key) ? `BookCard--active` : ``}`}
              onClick={() => {
                if (activeBookKey !== book.key)
                  dispatch(ActiveBookActions.setActiveBook({book}));
                else
                  dispatch(ActiveBookActions.clearActiveBook());
              }}
              bookKey={book.key}
              title={book.title}
              subtitle={book.subtitle}
              language={book.language}
              authorName={book.author_name}
              bookRef={(index === response.docs.length - 1) ? lastBookElementRef : undefined}
            />
          );
        })}
      </SpinnerWrapper>
    </div>
  );
};

export default SearchResults;
