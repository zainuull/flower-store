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


export interface IOrderModel {
  data?: IDataOrderModel[];
}

export interface IDataOrderModel {
  id?: string;
  product_id?: string;
  user_id?: string;
  customer_name?: string;
  product_name?: string;
  client?: string;
  price?: number;
  quantity?: number;
  quantity_product?: number;
  total_price?: number;
  category?: string;
  created_at?: string;
  action?: string;
}
