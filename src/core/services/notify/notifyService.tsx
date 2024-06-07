import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const deleteCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export class NotifyService {
  wrongPassword = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Gagal',
      html: 'Email atau Password yang anda masukkan salah',
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  emptyQrcField() {
    throw new Error('Method not implemented.');
  }

  closeSwal = () => {
    Swal.close();
  };

  showLoading = () => {
    Swal.fire({
      title: 'Memuat',
      html: 'Harap Tunggu...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  loadingUpload = () => {
    Swal.fire({
      title: 'Mengunggah File',
      html: 'Harap Tunggu...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  beValidNumber = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian',
      html: 'Nomor SIM harus berupa angka',
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  emptyInputField = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian',
      html: 'Harap Lengkapi Data Yang Wajib Diisi',
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  notHaveProofPayment = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian',
      html: 'Bukti Pembayaran Tidak Tersedia',
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  tpsVerified = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian',
      html: 'TPS Sudah Terverifikasi, Harap Mengganti TPS Yang Dipilih',
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  developmentFeature = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Fitur masih dalam development',
        icon: 'warning',
        confirmButtonColor: '#b91c1c',
        confirmButtonText: `<span id="btn-confirm">Kembali</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  timeOutNotification = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Time Is Up!',
        text: 'Please Repurchase',
        icon: 'warning',
        confirmButtonColor: '#b91c1c',
        confirmButtonText: `<span id="btn-confirm">Kembali</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationReset = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Yang Anda Inputkan Akan Dibersihkan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationCreate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Yang Anda Masukan Akan Dikirim',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationChangePwd = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Kata Sandi Anda Akan diubah',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationReject = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: 'Apakah Anda Yakin ?',
        text: 'Request akan di tolak !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationDelete = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: 'Apakah Anda Yakin ?',
        text: 'Data Anda Akan Dihapus !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  successChangePassword = () => {
    return new Promise(() => {
      Swal.fire({
        icon: 'info',
        title: 'Berhasil Update Password!',
        text: 'Harap Login Kembali',
      }).then((res) => {
        if (res.isConfirmed) {
          window.localStorage.clear();
          deleteCookie('token');
          window.location.href = '/';
        }
      });
    });
  };

  confirmationCancel = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: 'Apakah Anda Yakin ?',
        text: 'Pembayaran Akan Di Batalkan !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationUpdate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Anda Sebelumnya akan Diperbaharui',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationLogout = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin Ingin Keluar ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#b91c1c',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  photoEmpty = () => {
    Swal.fire({
      title: 'Perhatian !',
      text: 'Foto Halaman 2 Wajib Diisi',
      icon: 'warning',
    });
  };
  successCopy = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Berhasil Disalin',
      icon: 'success',
    });
  };
  successCreate = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Anda Berhasil Terupload',
      icon: 'success',
    });
  };
  successCreateAndWaitConfirm = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Anda Berhasil Terupload, Harap Tunggu Konfirmasi Admin',
      icon: 'success',
    });
  };

  successDelete = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Anda Berhasil Dihapus',
      icon: 'success',
    });
  };

  successUpdate = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Anda Berhasil Terupdate',
      icon: 'success',
    });
  };

  successLogin = () => {
    Swal.fire({
      title: 'Login Sukses',
      icon: 'success',
    });
  };
}

export class ToastifyService {
  successUpdate = () => {
    toast.success('Data berhasil di perbarui', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  successAccept = () => {
    toast.success('Data berhasil di konfirmasi', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  successReject = () => {
    toast.success('Data berhasil di reject', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  successCreate = () => {
    toast.success('Data berhasil di buat', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  successDelete = () => {
    toast.success('Data berhasil di hapus', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
}
