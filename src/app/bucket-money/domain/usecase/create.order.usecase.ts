import { IDataOrderModel } from '../model/model';
import { Repository } from '../repository/repository';

export class CreateOrderUseCase {
  constructor(private Repo: Repository) {}

  async invoke(data: IDataOrderModel) {
    return this.Repo.createOrder(data);
  }
}
