import React, {FC} from "react";
import SearchForm from "#components/search/search-form/search-form";
import SearchResults from "#components/search/search-results/search-results";

const SearchBlock: FC = () => {

  return (
    <div className={`SearchBlock`}>
      <SearchForm />
      <SearchResults />
      {/*<SearchFooter />*/}
    </div>
  );
};

export default SearchBlock;
