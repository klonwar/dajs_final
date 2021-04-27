import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {readListSelector} from "#src/js/redux/selectors";
import BookCard from "#components/book-card/book-card";
import {ReadListActions, SavedBook} from "#src/js/redux/reducers/slices/read-list-slice";

const ReadList: FC = () => {
  const dispatch = useDispatch();
  const readList = useSelector(readListSelector);

  const readListArray = Object.values(readList);

  const renderBookCard = (item: SavedBook) => (
    <BookCard
      key={`${item.key}-readList`}
      bookKey={item.key}
      title={item.title}
      subtitle={item.subtitle}
      language={item.language}
      className={(item.read) ? `BookCard--read` : ``}
      authorName={item.author_name}>
      <div className={`BooksList-linksContainer`}>
        <a className={`BooksList-link`} href={`#`} onClick={() => {
          dispatch(ReadListActions.toggleReadState({key: item.key}));
        }}>Mark as {(item.read) ? `un` : ``}read</a>
        <a className={`BooksList-link`} href={`#`} onClick={() => {
          dispatch(ReadListActions.removeBook({key: item.key}));
        }}>Remove from list</a>
      </div>
    </BookCard>
  );

  return (
    <div className={`ReadList`}>
      <div className={`ReadList-header`}>
        <h2 className={`ReadList-title`}>To read list</h2>
        <span className={`ReadList-subtitle`}>
          {readListArray.length} books, {readListArray.filter((item) => item.read).length} read
        </span>
      </div>
      <div className={`BooksList`}>
        {readListArray.filter((item) => !item.read)?.map(renderBookCard)}
        {readListArray.filter((item) => item.read)?.map(renderBookCard)}
      </div>
    </div>
  );
};

export default ReadList;
