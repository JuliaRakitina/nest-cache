export interface IMember {
  id?: string;
  name?: string;
  email?: string;
  roleId?: string;
}

export interface IMemberResponse {
  members: IMember[];
}
