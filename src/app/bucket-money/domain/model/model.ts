export interface IBucketMoney {
  id: number;
  title: string;
  price: number;
  stock: number;
  type: string;
  imageUrl: string;
  description: string;
}

export interface IStore {
  id: number;
  title: string;
  imageUrl: string;
  quantity: number;
  total_price: number;
  type: string;
}
