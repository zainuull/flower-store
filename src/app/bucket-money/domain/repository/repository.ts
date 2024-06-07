import { IDataProductsModel, IProductsModel } from '@/core/interface/IModel';
import { IQueryModel } from '@/core/interface/IQueryModel';

export interface Repository {
  getData(query?: IQueryModel): Promise<IProductsModel>;
  getDataById(id: string): Promise<IProductsModel>;
  createData(data: IDataProductsModel): Promise<IProductsModel>;
  deleteData(id: string): Promise<IProductsModel>;
  updateData(id: string, data: IDataProductsModel): Promise<IProductsModel>;
}
