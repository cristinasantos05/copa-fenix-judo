export type Cup = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  teams: {
    name: string;
  }[];
};
