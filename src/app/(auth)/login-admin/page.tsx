'use client';
import { useRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HandleError } from '@/core/services/handleError/handleError';
import { NotifyService } from '@/core/services/notify/notifyService';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import VM from './(presentation)/vm/vm';
import axios from 'axios';

const Login = () => {
  const { loginDashboard } = VM();
  const router = useRouter();
  const [viewPwd, setViewPwd] = useState(false);
  const notifyService = new NotifyService();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const tooglePassword = () => {
    if (viewPwd) {
      setPassword(password);
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    }

    setViewPwd(!viewPwd);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    notifyService.showLoading();
    setIsLoading(true);

    try {
      const res = await loginDashboard({
        email: email,
        password: password,
      });

      localStorage.setItem('currentUser', JSON.stringify(res.data));

      // Assuming res.data contains the token
      const token = res?.data?.token;

      document.cookie = `token=${token}`;

      router.push('/');
      Swal.close();
    } catch (error) {
      Swal.close();
      setIsLoading(false);
      HandleError(error);
      console.error('Login failed', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is Enter (key code 13)
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="w-full h-screen bg-secondary px-1 xl:p-4 flex xl:justify-center xl:items-center py-20 select-none">
      <div className="w-full xl:w-1/3 h-1/2 xl:h-4/5 flex flex-col items-center lg:justify-center xl:justify-normal gap-y-2 bg-white rounded-lg">
        <h1 className="text-xs xl:text-xl font-semibold leading-relaxed mt-5 text-primary">
          Login Admin
        </h1>
        <h1 className="text-xs xl:text-xl font-semibold leading-relaxed">Masuk ke akun Anda</h1>
        <p className="text-gray-400 text-xs lg:text-base text-center">
          Silahkan Masukan Email & kata sandi{' '}
        </p>
        <form className="w-full flex flex-col items-center gap-y-4 xl:gap-y-10 mt-2 lg:mt-12">
          <input
            id="email"
            type="mail"
            className="border-2 text-black placeholder:text-gray-600 border-gray-400 rounded-lg px-6 h-14 xl:h-16 w-11/12 xl:w-4/5 outline-none text-xs xl:text-base"
            placeholder="Masukkan email"
            autoComplete="email"
            value={email || ''}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          />
          <div className="w-11/12 xl:w-4/5 relative">
            <input
              id="password"
              ref={passwordRef}
              type={viewPwd ? 'text' : 'password'}
              className="w-full border-2 text-black placeholder:text-gray-600 border-gray-400 rounded-lg px-6 h-14 xl:h-16 outline-none text-xs xl:text-base"
              placeholder="Kata Sandi"
              autoComplete="current-password"
              value={password || ''}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              required
            />
            {password && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-sm leading-5">
                <button
                  onClick={tooglePassword}
                  type="button"
                  className="whitespace-nowrap flex items-center justify-center">
                  {viewPwd ? (
                    <FiEye
                      size={24}
                      className="w-[15px] h-[15px] xl:w-[22px] xl:h-[22px] cursor-pointer"
                    />
                  ) : (
                    <FiEyeOff
                      size={24}
                      className="w-[15px] h-[15px] xl:w-[22px] xl:h-[22px] cursor-pointer"
                    />
                  )}
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className={`${
              password?.length ? 'bg-primary' : 'disabled-button'
            } rounded-lg px-6 h-12 xl:h-16 w-11/12 xl:w-4/5  text-white text-xs xl:text-base`}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <p className="text-primary  mt-2 cursor-pointer text-xs xl:text-sm">Lupa Kata Sandi?</p>
      </div>
    </div>
  );
};

export default Login;
