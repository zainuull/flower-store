import { IDataCategoryModel } from '@/core/interface/IModel';
import { Repository } from '../repository/repository';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataCategoryModel) {
    return this.Repo.createData(data);
  }
}
