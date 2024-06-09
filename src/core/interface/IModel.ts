export interface IModel {
  _id?: string;
  created_at?: Date;
  updated_at?: Date;
}

import { IQueryModel } from '@/core/interface/IQueryModel';

export interface ICategoryModel {
  data?: IDataCategoryModel[];
}

export interface IDataCategoryModel {
  id?: string;
  name?: string;
  user_id?: string;
  action?: string;
  products?: IDataProductsModel[];
}

export interface IProductsModel {
  data?: IDataProductsModel[];
}

export interface IDataProductsModel {
  id?: string;
  user_id?: string;
  name?: string;
  quantity?: number;
  original_price?: number | string;
  discount_price?: number | string;
  is_discount?: boolean;
  flash_sale_price?: number | string;
  is_flash_sale?: boolean;
  imageUrl?: string;
  public_id?: string;
  created_at?: string;
  category?: string;
  description?: string;
  categories?: IDataCategoryModel[];
  users?: IDataUserModel[];
  action?: string;
  data?: IDataProductsModel;
}

export interface IProductQuery extends IQueryModel {
  user_id?: string;
}

export interface IDataModel {
  _id?: string;
  isDeleted?: boolean;
  isActive?: boolean;
  deletedAt?: Date;
  created_at?: Date;
  created_by?: any;
  updated_at?: Date;
  updated_by?: any;
  deleted_at?: Date;
  deleted_by?: any;
  printed_at?: Date;
  printed_by?: any;
}

export interface IUserModel extends IModel {
  totalData?: number;
  totalPage?: number;
  data?: IDataUserModel[];
}

export interface IDataUserModel {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  current_password?: string;
  new_password?: string;
  phone?: string;
  address?: string;
  role?: string;
  action?: string;
  created_at?: string;
  products?: IDataProductsModel[];
  data?: IDataUserModel;
  image?: string;
  token?: string;
}

export interface ISessionModel {
  user?: IDataUserModel;
  expires?: string;
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
}
