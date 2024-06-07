import { IDataCategoryModel } from '@/core/interface/IModel';
import { Repository } from '../repository/repository';

export class UpdateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string, data: IDataCategoryModel) {
    return this.Repo.updateData(id, data);
  }
}
