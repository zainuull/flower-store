import Swal from 'sweetalert2';

export const HandleError = (err: any) => {
  const errRes = err.response;
  const message =
    (errRes && errRes?.data.message) || err.statusText || err.message || errRes.data.errors || '';
  const status = err.status || errRes?.data.statusCode || errRes?.status || err['statusCode'] || 0;
  const result = errRes?.data.errors?.map((el: any) => el.message);
  console.log(result);
  console.log(status);
  console.log(message);

  const deleteCookie = (cookieName: string) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  switch (status) {
    case 400:
      if (typeof message == 'string') {
        switch (message) {
          case 'Product not found':
            Swal.fire({
              icon: 'info',
              title: 'Maaf!',
              text: 'Product tidak ada!',
            });
          case 'Insufficient product quantity':
            Swal.fire({
              icon: 'info',
              title: 'Maaf!',
              text: 'Stock Product tidak cukup!',
            });
            break;
          case 'Data not found':
            Swal.fire({
              icon: 'info',
              title: 'Maaf!',
              text: 'Harap buat data terlebih dahulu!',
            });
            break;
          case 'Username has already exists':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Username telah terdaftar!',
            });
            break;
          case 'Product ID has already exists':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Product ID telah terdaftar!',
            });
            break;
          case 'Account not registered':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Akun tidak terdaftar!',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Terdapat kesalahan',
              footer: `err: (${status}) ${message || ''}`,
            });
        }
      }
      break;
    case 401:
      if (typeof message == 'string') {
        switch (message) {
          case 'Unauthorized: No token provided':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Unauthorized:Harap Login Terlebih Dahulu',
            }).then((res) => {
              if (res.isConfirmed) {
                window.localStorage.clear();
                deleteCookie('token');
                window.location.href = '/';
              }
            });
            break;
          case 'Unauthorized':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Token Kadaluarsa !, Harap Login Kembali',
            }).then((res) => {
              if (res.isConfirmed) {
                window.localStorage.clear();
                deleteCookie('token');
                window.location.href = '/';
              }
            });
            break;
          case 'Your Password is Wrong':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Password Salah !',
            });
            break;
          case 'User not registered !':
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Akun belum terdaftar',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Error !',
              text: 'Terdapat kesalahan',
              footer: `err: (${status}) ${message || ''}`,
            });
            break;
        }
      }
      break;
  }
};
