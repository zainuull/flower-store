import { atom, useAtom } from 'jotai';
import { IDataOrderModel } from '../bucket-money/domain/model/model';

const store = atom<IDataOrderModel>({
  product_id: '',
  user_id: '',
  customer_name: '',
  product_name: '',
  client: '',
  price: 0,
  quantity: 0,
  total_price: 0,
  category: '',
  created_at: '',
});

const useStore = () => useAtom(store);

export default useStore;
