import React from "react";
import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {activeBookSelector} from "#src/js/redux/selectors";
import LanguagesList from "#components/languages-list/languages-list";
import {ReadListActions} from "#src/js/redux/reducers/slices/read-list-slice";
import {ActiveBookActions} from "#src/js/redux/reducers/slices/active-book-slice";

const BookDescription: FC = () => {
  const dispatch = useDispatch();
  const activeBook = useSelector(activeBookSelector);

  if (!activeBook) {
    return (
      <div className={`BookDescription`}>
        <div className={`BookDescription-body BookDescription-body--empty`}>
          <span className={`BookDescription-bookImg`} />
          <h2 className={`BookDescription-title`}>Выберите книгу</h2>
        </div>
      </div>
    );
  }

  const {
    title = ``,
    subtitle = ``,
    key = ``,
    language = [],
    has_fulltext,
    first_publish_year,
    publish_year = [],
    author_name = []
  } = activeBook;

  return (
    <div className={`BookDescription`}>
      <div className={`BookDescription-container`}>
        <div className={`BookDescription-header`}>
          <h1 className={`BookDescription-title`}>{title}</h1>
          <span className={`BookDescription-author`}>{author_name.join(`, `) || `???`}</span>
          <span className={`BookDescription-subtitle`}>{subtitle}</span>
          <LanguagesList bookKey={key} languages={language} />
        </div>
        <div className={`BookDescription-body`}>
          <div className={`BookDescription-line`}>
            <span>Full text available</span>
            <span>{(has_fulltext) ? `Yes` : `No`}</span>
          </div>
          {
            (first_publish_year) ? (
              <div className={`BookDescription-line`}>
                <span>First publish year</span>
                <span>{first_publish_year}</span>
              </div>
            ) : undefined
          }
          {
            (publish_year.length > 0) ? (
              <div className={`BookDescription-line`}>
                <span>Years published</span>
                <span>{publish_year.slice().sort().join(`, `)}</span>
              </div>
            ) : undefined
          }
        </div>
      </div>
      <div className={`BookDescription-footer`}>
        <button className={`BookDescription-button BookDescription-button--inverse`}
                onClick={() => {
                  dispatch(ActiveBookActions.clearActiveBook());
                }}>
          Close
        </button>
        <a href={`https://openlibrary.org${key}`} target={`_blank`}
           className={`BookDescription-button BookDescription-button--inverse`}>
          Open
        </a>
        <button className={`BookDescription-button`}
                onClick={() => {
                  dispatch(ReadListActions.pushBook({book: activeBook}));
                }}>
          Add
        </button>
      </div>
    </div>
  );
};

export default BookDescription;
