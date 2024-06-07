import { IDataUserModel } from '@/core/interface/IModel';
import { Repository } from '../repository/repository';

export class LoginUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataUserModel) {
    return this.Repo.loginData(data);
  }
}
