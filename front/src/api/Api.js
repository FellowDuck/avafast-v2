import axios from 'axios';
import { serialize } from 'object-to-formdata';
import qs from 'qs';
import config from '../config';

export function queryString(params = {}, options = {}) {
  return qs.stringify(parseParams(params), { arrayFormat: 'brackets', ...options });
}

export function formData(data = {}, options = {}) {
  return serialize(parseParams(data), { indices: true, ...options });
}

export function parseParams(data = {}) {
  const result = {};

  for (const attr in data) {
    let value = data[attr];

    // Ignore undefined
    if (typeof value === 'undefined') {
      continue;
    }

    // Transform bool to intbool
    if (typeof value === 'boolean') {
      value = Number(value);
    }

    // Transform null to empty string
    if (value === null) {
      value = '';
    }

    // Recursive for array or object
    if (value instanceof Array || value instanceof Object) {
      if (!(value instanceof FileList) && !(value instanceof File)) {
        value = parseParams(value);
      }
    }

    result[attr] = value;
  }

  return result;
}

const ApiDefault = axios.create({
  baseURL: config.urlApiAVAFAST,
  paramsSerializer: queryString,
});

export default ApiDefault