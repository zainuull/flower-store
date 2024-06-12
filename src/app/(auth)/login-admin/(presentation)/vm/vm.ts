import { IDataUserModel } from '@/core/interface/IModel';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import { LoginDashboardUseCase } from '../../domain/usecase';

export default function VM() {
  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const loginDashboardUseCase = new LoginDashboardUseCase(dataSourceImpl);

  //function
  async function loginDashboard(data: IDataUserModel) {
    return await loginDashboardUseCase.invoke(data);
  }

  return {
    loginDashboard,
  };
}
