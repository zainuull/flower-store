'use client';
import useUser from './store/store.user';
import { useEffect, useState } from 'react';
import BucketMoney from './bucket-money/page';
import Profile from './(sharedComponents)/profile';
import useOverlay from './store copy/store.notif';
import Header from './(sharedComponents)/header';
import ToastNotify from '@/core/services/notify/toast';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [users, setUser] = useUser();
  const user = users || {};
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const [isOverlay, setIsOverlay] = useOverlay();

  useEffect(() => {
    const res = JSON?.parse(localStorage.getItem('currentUser') || '{}');
    setUser(res);
  }, []);

  return (
    <main className="w-full min-h-screen overflow-y-scroll flex flex-col xl:gap-y-5 items-center">
      <Header
        user={user}
        setIsOverlay={setIsOverlay}
        isOverlay={isOverlay}
        setIsMenu={setIsMenu}
        isMenu={isMenu}
      />
      <BucketMoney
        user={user}
        setIsOverlay={setIsOverlay}
        isOverlay={isOverlay}
        setIsDetail={setIsDetail}
        isDetail={isDetail}
        setIsPayment={setIsPayment}
        isPayment={isPayment}
      />
      <Profile isMenu={isMenu} setIsMenu={setIsMenu} user={user} />
      {/* Overlay */}
      {isOverlay && <span className="absolute bg-black/60 w-full h-[120%] xl:h-[100%] top-0"></span>}
      <ToastNotify />
    </main>
  );
}
