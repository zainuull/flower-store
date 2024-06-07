import { Repository } from '../repository/repository';

export class GetDataByIdUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string) {
    return this.Repo.getDataById(id);
  }
}
