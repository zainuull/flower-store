import { useState } from 'react';
import {
  CreateOrderUseCase,
  GetCategoryUseCase,
  GetDataByIdUseCase,
  GetDataUseCase,
} from '../../domain/usecase';
import APIDataSourceImpl from '../../data/api.data.source';
import { IQueryModel } from '@/core/interface/IQueryModel';
import { ICategoryModel, IDataProductsModel, IProductsModel } from '@/core/interface/IModel';
import { IDataOrderModel } from '../../domain/model/model';

export default function VM() {
  const [datas, setDatas] = useState<IProductsModel>();
  const [dataById, setDataById] = useState<IDataProductsModel>();
  const [categories, setCategories] = useState<ICategoryModel>();

  //data source
  const apiDataSource = new APIDataSourceImpl();

  //use case
  const getDataUseCase = new GetDataUseCase(apiDataSource);
  const getDataByIdUseCase = new GetDataByIdUseCase(apiDataSource);
  const getCategoriesUseCase = new GetCategoryUseCase(apiDataSource);
  const createOrderUseCase = new CreateOrderUseCase(apiDataSource);

  //function
  async function getData(query: IQueryModel) {
    setDatas(await getDataUseCase.invoke(query));
  }

  async function getDataById(id: string) {
    setDataById(await getDataByIdUseCase.invoke(id));
  }
  async function getCategory(query: IQueryModel) {
    setCategories(await getCategoriesUseCase.invoke(query));
  }

  async function createOrder(data: IDataOrderModel) {
    return await createOrderUseCase.invoke(data);
  }

  return {
    getData,
    datas,
    dataById,
    getDataById,
    getCategory,
    categories,
    createOrder,
  };
}
