import {HttpParams} from '@angular/common/http';
import {FetchParams, Link} from '../types/common';
import {Observable, ReplaySubject, Subscription} from 'rxjs';

export function httpParamsFromFetchParams(fetchParams: FetchParams): HttpParams {
  let params = new HttpParams();
  if (fetchParams) {
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
  }
  return params;
}

export function fetchLink<T extends string = null>(linkable: { links: Array<Link<T>> }, key: string): Array<Link<T>> {
  return linkable.links.filter(link => link.rel === key);
}

export function multicastOptionsToObservables<T = any>(
  multicastOptions: MulticastOptions,
  multicastObservables: MulticastObservables<T>
): MulticastObservables<T> {
  if (multicastOptions) {
    return {
      subject: multicastOptions.subject ? multicastObservables.subject : undefined,
      loader: multicastOptions.loader ? multicastObservables.loader : undefined,
      subscription: multicastOptions.subscription ? multicastObservables.subscription : undefined,
      subscriptionSetter: multicastObservables.subscriptionSetter
    };
  } else {
    return {};
  }
}

export const ALL_MULTICAST_OPTIONS: MulticastOptions = {
  subject: true,
  loader: true,
  subscription: true
};

export const LOADER_ONLY: MulticastOptions = {
  loader: true
};

export const PARALLEL: MulticastOptions = {
  subject: true,
  loader: true
};

export const NO_SUBJECT: MulticastOptions = {
  loader: true,
  subscription: true
};

export interface MulticastOptions {
  url?: string;
  subject?: boolean,
  loader?: boolean,
  subscription?: boolean
}

export interface MulticastObservables<T = any> {
  subject?: ReplaySubject<T> | undefined,
  loader?: ReplaySubject<boolean>;
  subscription?: Subscription;
  subscriptionSetter?: (s: Subscription) => void;
}

export function multicastRequest<T = any>(
  observable: Observable<T>,
  multicastOptions: MulticastObservables<T>): Observable<T> {
  const {loader, subject, subscription, subscriptionSetter} = multicastOptions;
  if (loader) {
    loader.next(true);
  }
  if (subscription) {
    subscription.unsubscribe();
  }
  const s = observable.subscribe(value => {
    if (loader) {
      loader.next(false);
    }
    if (subject) {
      subject.next(value);
    }
  }, error => {
    if (loader) {
      loader.next(false);
    }
    console.error(error);
  });
  if (subscription) {
    subscriptionSetter(s);
  }
  return observable;
}


export function multicastRequestLoader<T = any>(
  observable: Observable<T>,
  subject: ReplaySubject<T> | undefined,
  loader: ReplaySubject<boolean>,
  subscription: Subscription = null): Subscription {
  loader.next(true);
  if (subscription) {
    subscription.unsubscribe();
  }
  return observable.subscribe(value => {
    loader.next(false);
    if (subject) {
      subject.next(value);
    }
  }, error => {
    loader.next(false);
    console.error(error);
  });
}
