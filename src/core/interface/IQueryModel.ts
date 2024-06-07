export interface IQueryModel {
  sort?: string;
  select?: string;
  page?: number;
  limit?: number;
  user_id?: string;
  client_id?: number;
  end_user_id?: number;
  region_id?: number;
  operator_id?: number;
  status?: string;
  msisdn?: string;
  timeframe?: string;
  general_role?: string;

  sortBy?: string;
  sortDir?: number;
  search?: string;
}
