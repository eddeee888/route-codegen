export const patternUser = '/app/users/:id/:subview(profile|pictures)?';
export interface pathParamsUser {
  id: string;
  subview?: 'profile' | 'pictures';
}

export interface urlPartsUser {
  path: pathParamsUser;
  urlQuery?: Partial<Record<string, string>>;
}
