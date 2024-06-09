import { IQueryModel } from '@/core/interface/IQueryModel';
import { Repository } from '../repository/repository';

export class GetCategoryUseCase {
  constructor(private Repo: Repository) {}

  async invoke(query:IQueryModel) {
    return this.Repo.getCategory(query);
  }
}
