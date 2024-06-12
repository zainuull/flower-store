import { IDataUserModel } from '@/core/interface/IModel';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { CiShoppingCart } from 'react-icons/ci';
import { IoChevronDownSharp, IoChevronForward } from 'react-icons/io5';

const Header = ({
  user,
  setIsOverlay,
  isOverlay,
  setIsMenu,
  isMenu,
}: {
  user: IDataUserModel;
  setIsOverlay: Function;
  isOverlay: boolean;
  setIsMenu: Function;
  isMenu: boolean;
}) => {
  const handleMenu = () => {
    setIsOverlay(!isOverlay);
    setIsMenu(!isMenu);
  };
  return (
    <header className="w-full h-20 flex flex-col items-center justify-center gap-y-2 my-4 xl:my-16">
      <p className="uppercase lg:text-4xl xl:text-9xl text-primary font-semibold">Blooms</p>
      <div className="w-full flex items-center justify-between border-y-2 border-black p-2 font-semibold text-[8px] xl:text-base">
        <Link href={'/'} className="hover:text-primary transition-all">
          Bucket Uang
        </Link>
        <Link href={'/'} className="hover:text-primary transition-all">
          Bucket Bunga
        </Link>
        <Link href={'/'} className="hover:text-primary transition-all">
          Bucket Papan
        </Link>
        <Link href={'/'} className="hover:text-primary transition-all">
          Giant Bucket
        </Link>
        <div className="flex items-center gap-x-1 xl:gap-x-4">
          <CiShoppingCart size={35} className="text-primary w-[20px] h-[20px] xl:w-[35px] xl:h-[35px]" />
          {(user.name) && (
            <div className="flex items-center xl:gap-x-4">
              <div
                onClick={handleMenu}
                className="flex items-center gap-x-1 xl:gap-x-4 cursor-pointer">
                <CgProfile
                  size={27}
                  className="w-[13px] h-[13px] xl:w-[22px] xl:h-[22px] cursor-pointer"
                />
                <p className="text-[8px] xl:text-base">{user?.name ? user?.name : 'Unkown'}</p>
                {isMenu ? (
                  <IoChevronDownSharp
                    size={30}
                    className="w-[8px] h-[8px] xl:w-[20px] xl:h-[20px] cursor-pointer"
                  />
                ) : (
                  <IoChevronForward
                    size={30}
                    className="w-[8px] h-[8px] xl:w-[20px] xl:h-[20px] cursor-pointer"
                  />
                )}
              </div>
            </div>
          )}
          {!user.token && (
            <Link href={'/login-customer'} className="px-6 py-1 bg-primary text-white rounded-lg">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
