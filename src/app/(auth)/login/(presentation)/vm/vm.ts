import { IDataUserModel } from '@/core/interface/IModel';
import ApiDataSourceImpl from '../../data/api/api.data.source';
import { LoginUseCase } from '../../domain/usecase';

export default function VM() {
  //data source
  const dataSourceImpl = new ApiDataSourceImpl();
  const loginUseCase = new LoginUseCase(dataSourceImpl);

  //function
  async function loginData(data: IDataUserModel) {
    return await loginUseCase.invoke(data);
  }

  return {
    loginData,
  };
}
