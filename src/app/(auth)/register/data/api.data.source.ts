import { Http } from '@/core/services/http/http.client';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { Repository } from '../domain/repository/repository';
import { ICustomersModel, IDataCustomersModel } from '../domain/model/model';

export default class APIDataSourceImpl implements Repository {
  async createData(data: IDataCustomersModel) {
    const res = await Http.post<ICustomersModel>('/api/customers', data);
    return res.data;
  }
}
