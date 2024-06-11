import { CreateDataUseCase } from '../../domain/usecase';
import APIDataSourceImpl from '../../data/api.data.source';
import { IDataCustomersModel } from '../../domain/model/model';

export default function VM() {
  //data source
  const apiDataSource = new APIDataSourceImpl();

  //use case
  const createDataUseCase = new CreateDataUseCase(apiDataSource);

  //function
  async function createData(data: IDataCustomersModel) {
    return await createDataUseCase.invoke(data);
  }

  return {
    createData,
  };
}
