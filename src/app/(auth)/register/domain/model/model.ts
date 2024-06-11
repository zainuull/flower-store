import { IModel } from '@/core/interface/IModel';

export interface ICustomersModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IDataCustomersModel[];
}

export interface IDataCustomersModel {
  id?: string;
  name?: string;
  username?: string;
  client?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: string;
  action?: string;
  created_at?: string;
  data?: IDataCustomersModel;
  image?: string;
  token?: string;
}
