import { IDataUserModel } from '@/core/interface/IModel';
import { atom, useAtom } from 'jotai';
import { IStore } from '../bucket-money/domain/model/model';

const store = atom<IStore>({
  id: 0,
  title: '',
  imageUrl: '',
  quantity: 0,
  total_price: 0,
  type: '',
});

const useStore = () => useAtom(store);

export default useStore;
