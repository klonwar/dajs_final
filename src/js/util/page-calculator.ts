import cfg from "#client/config.json";

export interface PagesInfo {
  pagesCount: number,
  currentPage: number,
  hasMore: boolean,
}

const calculatePagesInfo = (start: number, numFound: number, pageSize = cfg.pageSize): PagesInfo => {
  const pagesCount = Math.ceil(numFound / pageSize);
  const currentPage = Math.ceil((start + 1) / pageSize);

  return {
    pagesCount,
    currentPage,
    hasMore: currentPage < pagesCount
  };
};

export default calculatePagesInfo;