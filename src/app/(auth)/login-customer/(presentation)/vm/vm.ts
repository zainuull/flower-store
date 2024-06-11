import { IDataUserModel } from '@/core/interface/IModel';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import { LoginDashboardUseCase, LoginCustomerUseCase } from '../../domain/usecase';

export default function VM() {
  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const loginDashboardUseCase = new LoginDashboardUseCase(dataSourceImpl);
  const loginCustomerUseCase = new LoginCustomerUseCase(dataSourceImpl);

  //function
  async function loginDashboard(data: IDataUserModel) {
    return await loginDashboardUseCase.invoke(data);
  }

  async function loginCustomer(data: IDataUserModel) {
    return await loginCustomerUseCase.invoke(data);
  }

  return {
    loginDashboard,
    loginCustomer,
  };
}
