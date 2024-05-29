export type cultivation = {
  id: string;
  name: string;
};
export type Role = {
  id: number;
  name: string;
  description?: string;
};
export type User = {
  id: number;
  name: string;
};
export type cultivationUsers = {
  cultivation_id: string;
  role: Role;
  user: User;
};

export type addUserPayload = {
  role: {
    id: number;
  };
  user: {
    id: number;
  };
};
export type CultivationReducer = {
  roles: Role[];
};
export interface reducer {
  cultivations: CultivationReducer;
}
