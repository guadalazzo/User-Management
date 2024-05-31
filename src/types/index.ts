export type Cultivation = {
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
export type CultivationUser = {
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
  cultivations: Cultivation[];
  currentCultivation: Cultivation;
};
export interface reducer {
  cultivations: CultivationReducer;
}
