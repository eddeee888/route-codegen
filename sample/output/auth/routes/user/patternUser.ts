export const patternUser = '/app/users/:id/:subview(profile|pictures)?';
export interface PathParamsUser {
  id: string;
  subview?: 'profile' | 'pictures';
}

export interface UrlPartsUser {
  path: PathParamsUser;
  urlQuery?: Partial<Record<string, string>>;
}
