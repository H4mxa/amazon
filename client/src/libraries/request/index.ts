import { ErrorCodes } from '../utils/errorCodes';
import 'whatwg-fetch';
import AppRoutes from 'app/routes/AppRoutes';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON(response: any) {
  let parsedResponse: any = null;
  let newResponse: any = {};
  newResponse.status = response.status;
  newResponse.url = response.url;
  newResponse.statusText = response.statusText;

  const headers = response.headers;

  if (response.status === 204 || response.status === 205) {
    return newResponse;
  }
  const contentType = headers.get('content-type');
  if (contentType && contentType.includes('text/html')) {
    parsedResponse = await response.text();
  } else {
    parsedResponse = await response.json();
  }
  if (response.status >= 200 && response.status < 300) {
    newResponse.data = parsedResponse;
  } else {
    newResponse = { ...newResponse, ...parsedResponse };
  }
  return newResponse;
}

async function checkUnauthorizedToken(response: any) {
  if (response.status === 401 && response.errorCode) {
    switch (response.errorCode) {
      case ErrorCodes.INVALID_TOKEN_ERROR:
        break;
      case ErrorCodes.NO_TOKEN_PROVIDED_ERROR:
        break;
      case ErrorCodes.TOKEN_AUTH_FAILED_ERROR:
        break;
      case ErrorCodes.TOKEN_EXPIRED_ERROR:
        break;

      default:
        return null;
    }
    /**
     * TODO: Remove persisted deltails if any
     ** Dependencey: on ReduxPersist functionality
     */
    await AppRoutes.navigate('/login', {
      replace: true,
    });
    return null;
  }
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: any) {
  if (response.status >= 200 && response.status < 300) {
    delete response.statusText;
    return response;
  }
  await checkUnauthorizedToken(response);

  throw response;
  // if (response.error || response.errors) {
  //   throw response;
  // } else {
  //   const error = new Error(response.message || response.statusText);
  //   throw error;
  // }
  // throw response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

interface Options {
  method: string;
  contentType?: string;
  token?: string;
  cache?: string;
  authorization?: string;
}

export function request(url: string, data: any, options: Options) {
  const headers: any = {};
  let method: string = '';
  if (options) {
    if (Object.prototype.hasOwnProperty.call(options, 'token')) {
      headers['x-access-token'] = localStorage.token;
    }

    if (Object.prototype.hasOwnProperty.call(options, 'authorization')) {
      headers['Authorization'] = options.authorization; // eslint-disable-line
    }

    if (Object.prototype.hasOwnProperty.call(options, 'contentType')) {
      if (options.contentType !== 'multipart/form-data') {
        headers['Content-Type'] = options.contentType;
      }
    }

    if (Object.prototype.hasOwnProperty.call(options, 'method')) {
      method = options.method;
    } else {
      method = 'POST';
    }
  }

  const headersOptions: any = {
    method,
    headers,
  };

  if (Object.prototype.hasOwnProperty.call(options, 'cache')) {
    headersOptions['cache'] = options.cache;
  }

  if (data) {
    if (options && options.contentType === 'application/json') {
      headersOptions['body'] = JSON.stringify(data);
    } else {
      headersOptions['body'] = data;
    }
  }

  return fetch(url, headersOptions).then(parseJSON).then(checkStatus);
}
