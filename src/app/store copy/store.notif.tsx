import { atom, useAtom } from 'jotai';

const store = atom(false);

const useOverlay = () => useAtom(store);

export default useOverlay;
