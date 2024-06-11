import { Http } from '@/core/services/http/http.client';
import { Repository } from '../../domain/repository/repository';
import { IDataUserModel } from '@/core/interface/IModel';

export default class ApiDataSourceImpl implements Repository {
  async loginDashboard(data: IDataUserModel) {
    const res = await Http.post<IDataUserModel>('/api/auth/login-dashboard', data);
    return res.data;
  }
  async loginCustomer(data: IDataUserModel) {
    const res = await Http.post<IDataUserModel>('/api/auth/login-customer', data);
    return res.data;
  }
}
