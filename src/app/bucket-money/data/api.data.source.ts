import { Http } from '@/core/services/http/http.client';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { Repository } from '../domain/repository/repository';
import { IDataProductsModel, IProductsModel } from '@/core/interface/IModel';

export default class APIDataSourceImpl implements Repository {
  // Member
  async getData(query?: IQueryModel) {
    const res = await Http.get<IProductsModel>('/api/products', query);
    return res.data;
  }

  async getDataById(id: string) {
    const res = await Http.get<IProductsModel>(`/api/products/${id}`);
    return res.data;
  }

  async createData(data: IDataProductsModel) {
    const res = await Http.post<IProductsModel>('/api/products', data);
    return res.data;
  }

  async deleteData(id: string) {
    const res = await Http.delete<IProductsModel>(`/api/products/${id}`);
    return res.data;
  }

  async updateData(id: string, data: IDataProductsModel) {
    const res = await Http.put<IProductsModel>(`/api/products/${id}`, data);
    return res.data;
  }
}
