import { IDataUserModel } from '@/core/interface/IModel';

export interface Repository {
  loginDashboard(data: IDataUserModel): Promise<IDataUserModel>;
}
