const pattern = '/app/users/:id/:subview(profile|pictures)?';
export interface UserPathParams {
  id: string;
  subview?: 'profile' | 'pictures';
}

export default pattern;
