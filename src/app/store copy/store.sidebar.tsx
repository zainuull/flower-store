import { atom, useAtom } from 'jotai';

const store = atom(false);

const useSidebar = () => useAtom(store);

export default useSidebar;
