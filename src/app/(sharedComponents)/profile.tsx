'use client';
// Icons
import { FaRegCircleXmark } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { IoIosLogOut } from 'react-icons/io';
import { GrUserSettings } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import { NotifyService } from '@/core/services/notify/notifyService';
import { IDataUserModel } from '@/core/interface/IModel';
import useOverlay from '../store copy/store.notif';

interface IProfile {
  isMenu: boolean;
  setIsMenu: Function;
  user: IDataUserModel;
}

const Profile = (props: IProfile) => {
  const { isMenu, setIsMenu, user } = props;
  const [isOverlay, setIsOverlay] = useOverlay();
  const notify = new NotifyService();
  const router = useRouter();

  const handleClose = () => {
    setIsOverlay(!isOverlay);
    setIsMenu(!isMenu);
  };

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const handleProfile = () => {
    router.push('/profile');
    setIsOverlay(!isOverlay);
    setIsMenu(!isMenu);
  };


  const handleLogout = () => {
    notify.confirmationLogout().then((res) => {
      if (res) {
        if (user.role?.includes('Client')) {
          router.push('/login-admin');
        } else {
          router.push('/login-customer');
        }
        setIsOverlay(false);
        window.localStorage.clear();
        deleteCookie('token');
        router.refresh();
      }
    });
  };

  return (
    <div
      className={`absolute right-1 xl:right-4 ${
        isMenu ? 'top-3 xl:top-8' : '-top-96'
      } w-44 xl:w-96 xl:h-96 bg-slate-100 rounded-xl flex flex-col gap-y-2 xl:gap-y-4 items-start text-black transition-all duration-500 shadow-md z-30 overflow-y-scroll pb-5`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between mt-2 px-4">
        <h1 className="text-primary font-semibold text-xs xl:text-base">Profile</h1>
        <FaRegCircleXmark
          onClick={handleClose}
          size={20}
          className="w-[15px] h-[15px] xl:w-[20px] xl:h-[20px] text-red-600 cursor-pointer"
        />
      </div>
      <div className="bg-primary w-full min-h-36 xl:h-72 flex flex-col gap-y-2 justify-center items-center text-white">
        <CgProfile size={30} className="w-[20px] h-[20px] xl:w-[30px] xl:h-[30px]" />
        <span className="text-center text-[10px] xl:text-base">
          <h1>{user?.name ? user?.name : 'Unkown'}</h1>
          <h1>{user?.role ? user?.role : 'Unkown'}</h1>
        </span>
      </div>
      <div className="w-full flex items-center justify-between px-2 xl:p-4 text-[8px] xl:text-sm">
        <button
          onClick={handleProfile}
          className="flex items-center gap-x-1 border border-primary rounded-md p-1 xl:p-2 hover:text-primary hover:font-semibold transition-all">
          <GrUserSettings size={15} className="w-[12px] h-[12px] xl:w-[17px] xl:h-[17px]" />
          <p>Profile</p>
        </button>
        <button
          className="flex items-center gap-x-1 border border-primary rounded-md p-1 xl:p-2 hover:text-primary hover:font-semibold transition-all"
          onClick={() => handleLogout()}>
          <IoIosLogOut size={15} className="w-[12px] h-[12px] xl:w-[17px] xl:h-[17px]" />
          <p>Sign Out</p>
        </button>
      </div>
    </div>
  );
};

export default Profile;
