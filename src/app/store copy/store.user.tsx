import { IDataUserModel } from '@/core/interface/IModel';
import { atom, useAtom } from 'jotai';

const store = atom<IDataUserModel>({
  id: '',
  name: '',
  username: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  role: '',
  action: '',
  created_at: '',
  image: '',
  token: '',
});

const useUser = () => useAtom(store);

export default useUser;
