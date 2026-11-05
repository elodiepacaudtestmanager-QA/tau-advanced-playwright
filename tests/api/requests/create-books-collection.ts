import { APIRequestContext } from '@playwright/test';
import { buildUrl } from '../../utils/apiUrlBuilder';
import { executeRequest } from '../../utils/apiRequestUtils';
import endpoints from '../../utils/apiEndpoints';
import methods from '../../utils/apiMethods';

async function addBookToCollection(apiContext: APIRequestContext, userId: string, isbns: string[]) {
  const method = methods.post;
  const requestOptions = { data: { userId: userId, collectionOfIsbns: isbns.map(isbn => ({ isbn })) }};
  const requestUrl = buildUrl(endpoints.books.post);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
  return response;
}

export default { addBookToCollection };
