import {HttpParams} from '@angular/common/http';
import {FetchParams, Link} from '../types/common';
import {Observable, ReplaySubject, Subscription} from 'rxjs';

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

export function fetchLink<T extends string = null>(linkable: { links: Array<Link<T>> }, key: string): Array<Link<any>> {
  return linkable.links.filter(link => link.rel === key);
}

export function multicastRequestLoader<T>(
  observable: Observable<T>,
  subject: ReplaySubject<T>,
  loader: ReplaySubject<boolean>,
  subscription: Subscription): Subscription {
  loader.next(true);
  if (subscription) {
    subscription.unsubscribe();
  }
  return observable.subscribe(value => {
    loader.next(false);
    subject.next(value);
  }, error => {
    loader.next(false);
    console.error(error);
  });
}
