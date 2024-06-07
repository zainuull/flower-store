import { Repository } from '../repository/repository';

export class DeleteDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(id: string) {
    return this.Repo.deleteData(id);
  }
}
