import { ICustomersModel, IDataCustomersModel } from '../model/model';

export interface Repository {
  createData(data: IDataCustomersModel): Promise<ICustomersModel>;
}
