import { IDataUserModel } from '@/core/interface/IModel';

export interface Repository {
  loginData(data: IDataUserModel): Promise<IDataUserModel>;
}
