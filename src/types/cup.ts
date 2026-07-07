export type Cup = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  teams: {
    name: string;
  }[];
};
