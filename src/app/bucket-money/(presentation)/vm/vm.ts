import { useState } from 'react';
import {
  CreateDataUseCase,
  DeleteDataUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
  UpdateDataUseCase,
} from '../../domain/usecase';
import APIDataSourceImpl from '../../data/api.data.source';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { IDataProductsModel, IProductsModel } from '@/core/interface/IModel';

export default function VM() {
  const [datas, setDatas] = useState<IProductsModel>();
  const [dataById, setDataById] = useState<IProductsModel>();

  //data source
  const apiDataSource = new APIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(apiDataSource);
  const getDataByIdUseCase = new GetDataByIdUseCase(apiDataSource);
  const createDataUseCase = new CreateDataUseCase(apiDataSource);
  const deleteDataUseCase = new DeleteDataUseCase(apiDataSource);
  const updateDataUseCase = new UpdateDataUseCase(apiDataSource);

  //function
  async function getData(query?: IQueryModel) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }

  async function createData(data: IDataProductsModel) {
    return await createDataUseCase.invoke(data);
  }

  async function deleteData(id: string) {
    return await deleteDataUseCase.invoke(id);
  }

  async function updateData(id: string, data: IDataProductsModel) {
    return await updateDataUseCase.invoke(id, data);
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    createData,
    deleteData,
    updateData,
  };
}
