import { Http } from '@/core/services/http/http.client';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { Repository } from '../domain/repository/repository';
import { ICategoryModel, IDataProductsModel, IProductsModel } from '@/core/interface/IModel';
import { IDataOrderModel, IOrderModel } from '../domain/model/model';

export default class APIDataSourceImpl implements Repository {
  // Member
  async getData(query: IQueryModel) {
    const res = await Http.get<IProductsModel>(`/api/products`, query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IDataProductsModel>(`/api/products/${id}`);
    return res.data;
  }

  async getCategory(query: IQueryModel) {
    const res = await Http.get<ICategoryModel>('/api/categories', query);
    return res.data;
  }

  async createOrder(data: IDataOrderModel) {
    const res = await Http.post<IOrderModel>('/api/orders', data);
    return res.data;
  }
}
