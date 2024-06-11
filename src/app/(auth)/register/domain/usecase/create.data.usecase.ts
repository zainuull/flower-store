import { Repository } from '../repository/repository';
import { IDataCustomersModel } from '../model/model';

export class CreateDataUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataCustomersModel) {
    return this.Repo.createData(data);
  }
}
