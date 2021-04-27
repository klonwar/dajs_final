const sendRequestOperation = async ({
                                      search,
                                      page = 1
                                    }: { search: string, page?: number }): Promise<SendRequestOperationResult> => {
  const startTime = Date.now();

  try {
    const response = await (await fetch(`https://openlibrary.org/search.json?q=${search}&page=${page}`)).json();

    return {
      startTime,
      search,
      response
    };
  } catch (e) {
    console.error(e);

    return {
      startTime,
      search,
      response: null
    } as SendRequestOperationResult;
  }
};

export interface Book {
  key: string;
  title: string;
  subtitle: string;
  author_name: Array<string>;
  language: Array<string>;
  has_fulltext: boolean;
  first_publish_year: number;
  publish_year: Array<number>;
}

export interface OpenLibraryResponse {
  numFound: number;
  start: number;
  docs: Array<Book>;
}

export interface SendRequestOperationResult {
  response: OpenLibraryResponse;
  search: string,
  startTime?: number;
}

export default sendRequestOperation;