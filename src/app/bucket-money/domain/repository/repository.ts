import { ICategoryModel, IDataProductsModel, IProductsModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { IDataOrderModel, IOrderModel } from '../model/model';

export interface Repository {
  getData(query: IQueryModel): Promise<IProductsModel>;
  getDataById(id: string): Promise<IDataProductsModel>;
  getCategory(query: IQueryModel): Promise<ICategoryModel>;
  createOrder(data: IDataOrderModel): Promise<IOrderModel>;
}
