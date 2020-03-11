interface ListCount {
  total_count: number;
}

export type List<T, K extends string | number | symbol> = ListCount & {
  [key in K]: Array<T>;
};

export interface Link<K extends string = null> {
  rel: ('self' | 'next') & K;
  href: string;
  content_type: string;
  description: string;
}

export interface ListPage {
  page: number;
  pageSize: number;
}

export interface FetchParams {
  limit?: number;
  offset?: number;
  sort?: string;
  l?: string;
}
