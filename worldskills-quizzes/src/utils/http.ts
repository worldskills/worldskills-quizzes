import {HttpParams} from '@angular/common/http';
import {FetchParams} from '../types/common';

export function httpParamsFromFetchParams(fetchParams: FetchParams): HttpParams {
  let params = new HttpParams();
  if (fetchParams.limit) {
    params = params.set('limit', fetchParams.limit + '');
  }
  if (fetchParams.offset) {
    params = params.set('offset', fetchParams.offset + '');
  }
  if (fetchParams.l) {
    params = params.set('l', fetchParams.l);
  }
  if (fetchParams.sort) {
    params = params.set('sort', fetchParams.sort);
  }
  return params;
}
