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
    <header className="w-full h-20 flex flex-col items-center justify-center gap-y-2 bg-red-800 text-white">
      <div className="flex justify-between w-full px-4">
        <p className="uppercase lg:text-2xl xl:text-2xl font-semibold">Rifki Perfume</p>
        <div className="flex items-center gap-x-4">
          <Link href={'#produk'}>Produk</Link>
          <Link
            href="https://wa.me/+6285217859184?text=Halo%20Saya%20Mau%20Pesan%20Parfum.!"
            target="_blank">
            Kontak
          </Link>

          {/* <CiShoppingCart size={35} className="w-[20px] h-[20px] xl:w-[35px] xl:h-[35px]" /> */}
          {user.name && (
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
          {/* {!user.token && (
            <Link href={'/login-customer'} className="px-6 py-1 bg-primary text-white rounded-lg">
              Login
            </Link>
          )} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
