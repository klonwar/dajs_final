import React from "react";
import {FC} from "react";
import SearchBlock from "#components/search/search-block/search-block";
import BookDescription from "#components/book-descriprion/book-description";
import ReadList from "#components/read-list/read-list";

const App: FC = () => {

  return (
    <div className={`MainContainer`}>
      <div className={`MainContainer-leftColumn`}>
        <SearchBlock />
      </div>
      <div className={`MainContainer-centerColumn`}>
        <BookDescription />
      </div>
      <div className={`MainContainer-rightColumn`}>
        <ReadList />
      </div>
    </div>
  );
};

export default App;
