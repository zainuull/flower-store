'use client';
import { useRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import { useRouter } from 'next/navigation';
import { IDataCustomersModel } from './domain/model/model';
import dayjs from 'dayjs';
import VM from './presentation/vm/vm';
import Link from 'next/link';

const Register = () => {
  const { createData } = VM();
  const router = useRouter();
  const [viewPwd, setViewPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [dataInput, setDataInput] = useState<IDataCustomersModel>({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const notifyService = new NotifyService();
  const toastifyService = new ToastifyService();

  const handleChange = (e: any) => {
    setDataInput({
      ...dataInput,
      [e.target.id]: e.target.value,
    });
  };

  const tooglePassword = () => {
    if (viewPwd) {
      setDataInput({ ...dataInput, password: dataInput?.password });
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }

    setViewPwd(!viewPwd);
  };

  const handleSubmit = () => {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm';
    const currentDate = dayjs().format(dateTimeFormat);
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        const payload = {
          name: dataInput.name,
          username: dataInput.username,
          client: 'Rini',
          email: dataInput.email,
          password: dataInput.password,
          phone: dataInput.phone,
          address: dataInput.address,
          role: 'Customer',
          created_at: currentDate,
          user_id: `${process.env.NEXT_PUBLIC_USER_ID}`,
          project_id: `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        };

        if (
          payload.name &&
          payload.username &&
          payload.email &&
          payload.password &&
          payload.phone &&
          payload.role &&
          payload.user_id
        ) {
          createData(payload)
            .then(() => {
              toastifyService.successCreate();
              router.push('/login-customer');
            })
            .catch((err) => {
              HandleError(err);
            });
        } else {
          notifyService.emptyInputField();
        }
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="w-full h-screen bg-secondary px-1 xl:p-4 flex xl:items-center xl:justify-center py-20 select-none">
      <div className="w-full xl:w-1/3 h-full xl:h-4/5 flex flex-col items-center lg:justify-center xl:justify-normal gap-y-1 bg-white rounded-lg pb-5">
        <h1 className="text-xs xl:text-xl font-semibold leading-relaxed mt-5 xl:mt-10">
          Daftar Akun
        </h1>
        <p className="text-gray-400 text-xs lg:text-base text-center">
          Silahkan Isi Form Dibawah Ini
        </p>
        <form className="w-full flex flex-col items-center gap-y-2 xl:gap-y-4 mt-2 lg:mt-6">
          <div className="w-11/12 xl:w-4/5 flex flex-col gap-y-1 text-xs xl:text-sm">
            <label htmlFor="name" className="font-medium">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={dataInput.name}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Input name user"
            />
          </div>
          <div className="w-11/12 xl:w-4/5 flex flex-col gap-y-1 text-xs xl:text-sm">
            <label htmlFor="username" className="font-medium">
              Username<span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={dataInput.username}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Input username"
            />
          </div>
          <div className="w-11/12 xl:w-4/5 flex flex-col gap-y-1 text-xs xl:text-sm">
            <label htmlFor="email" className="font-medium">
              Email<span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              type="text"
              value={dataInput.email}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Input email"
            />
          </div>
          <div className="w-11/12 xl:w-4/5 relative text-xs xl:text-sm">
            <label htmlFor="email" className="font-medium">
              Password<span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              ref={passwordRef}
              type={viewPwd ? 'text' : 'password'}
              className="bg-gray-100 w-full text-black placeholder:text-gray-600 rounded-lg px-2 h-10 xl:h-16 outline-none hover:outline-primary transition-all text-xs xl:text-base"
              placeholder="Kata Sandi"
              autoComplete="current-password"
              value={dataInput?.password || ''}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
            {dataInput.password && (
              <div className="absolute right-4 top-7 xl:top-10 flex items-center text-sm leading-5">
                <button
                  onClick={tooglePassword}
                  type="button"
                  className="whitespace-nowrap flex items-center justify-center">
                  {viewPwd ? (
                    <FiEye
                      size={24}
                      className="w-[12px] h-[12px] xl:w-[22px] xl:h-[22px] cursor-pointer"
                    />
                  ) : (
                    <FiEyeOff
                      size={24}
                      className="w-[12px] h-[12px] xl:w-[22px] xl:h-[22px] cursor-pointer"
                    />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="w-11/12 xl:w-4/5 flex flex-col gap-y-1 text-xs xl:text-sm">
            <label htmlFor="phone" className="font-medium">
              No Telp<span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="number"
              maxLength={13}
              value={dataInput.phone}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Input No Telp (628xxxxxxxxx)"
            />
          </div>
          <div className="w-11/12 xl:w-4/5 flex flex-col gap-y-1 text-xs xl:text-sm">
            <label htmlFor="address" className="font-medium">
              Address<span className="text-red-600">*</span>
            </label>
            <input
              id="address"
              type="text"
              value={dataInput.address}
              onChange={handleChange}
              className="bg-gray-100 rounded-lg h-10 px-2 outline-none hover:outline-primary transition-all"
              placeholder="Input address"
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className={`${
              dataInput.password?.length && dataInput.email?.length && dataInput.address?.length
                ? 'bg-primary'
                : 'disabled-button'
            } rounded-lg px-6 h-12 xl:h-16 w-11/12 xl:w-4/5  text-white text-xs xl:text-base`}>
            {isLoading ? 'Loading...' : 'Daftar'}
          </button>
        </form>
        <p className="mt-2 cursor-pointer text-xs xl:text-sm">
          Sudah Punya Akun?{' '}
          <Link href={'/login-customer'} className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
