import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {searchQuerySelector, searchResultsNumberSelector, searchStartNumberSelector} from "#src/js/redux/selectors";
import {Operations} from "#src/js/redux/operations/operations";
import cfg from "#client/config.json";
import calculatePagesInfo from "#src/js/util/page-calculator";

const SearchFooter: FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(searchQuerySelector);

  const numFound = useSelector(searchResultsNumberSelector);
  const startNumber = useSelector(searchStartNumberSelector);

  const pagesInfo = calculatePagesInfo(startNumber, numFound);

  return (
    (numFound || numFound === 0) ? (
        <div className={`SearchFooter`}>
          <>
            <div className={`SearchFooter-info`}>
              <span>Found: {numFound}</span>
              <span>Start: {startNumber}</span>
              <span>Page size: {cfg.pageSize}</span>
            </div>
            <button className={`SearchFooter-button`}
                    onClick={() => {
                      dispatch(Operations.sendRequest({search: searchQuery, page: pagesInfo.currentPage - 1}));
                    }}
                    disabled={pagesInfo.currentPage <= 1}>
              &lt;
            </button>
            <button className={`SearchFooter-button`}
                    onClick={() => {
                      dispatch(Operations.sendRequest({search: searchQuery, page: pagesInfo.currentPage + 1}));
                    }}
                    disabled={!pagesInfo.hasMore}>
              &gt;
            </button>
          </>
        </div>
    )
    : null
  );
};

export default SearchFooter;
