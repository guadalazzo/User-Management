export type cultivation = {
  id: string;
  name: string;
};
export type cultivationUsers = {
  cultivation_id: string;
  role: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    name: string;
  };
};
