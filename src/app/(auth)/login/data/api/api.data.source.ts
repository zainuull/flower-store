import { Http } from '@/core/services/http/http.client';
import { Repository } from '../../domain/repository/repository';
import { IDataUserModel } from '@/core/interface/IModel';

export default class ApiDataSourceImpl implements Repository {
  async loginData(data: IDataUserModel) {
    const res = await Http.post<IDataUserModel>('/api/auth/login', data);
    return res.data;
  }
}
