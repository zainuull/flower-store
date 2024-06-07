import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import { dataBank } from '@/data/mock.data';
import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { IStore } from '../../domain/model/model';
import useOverlay from '@/app/store copy/store.notif';

interface IPayment {
  setIsPayment: Function;
  isPayment: boolean;
  setStore: Function;
  store: IStore;
}

const Payment = (props: IPayment) => {
  const { setIsPayment, isPayment, setStore, store } = props;
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const notifyService = new NotifyService();
  const toastifyService = new ToastifyService();
  const [isOverlay, setIsOverlay] = useOverlay();
  const [selectedBank, setSelectedBank] = useState<any>();

  const handleBankChange = (e: any) => {
    const selectedBankName = e.target.value;
    const bank = dataBank.find((bank) => bank.name === selectedBankName);
    setSelectedBank(bank);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          notifyService.timeOutNotification().then((res) => {
            if (res) {
              setIsPayment(!isPayment);
              setStore({
                id: 0,
                title: '',
                imageUrl: '',
                quantity: 0,
                total_price: 0,
                type: '',
              });
            }
          });
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCancel = () => {
    notifyService.confirmationCancel().then((res) => {
      if (res) {
        window.location.reload();
        setStore({
          id: 0,
          title: '',
          imageUrl: '',
          quantity: 0,
          total_price: 0,
          type: '',
        });
      }
    });
  };

  const handlePayment = () => {
    notifyService.confirmationCreate().then((res) => {
      setIsPayment(!isPayment);
      setIsOverlay(!isOverlay);
      setStore({
        id: 0,
        title: '',
        imageUrl: '',
        quantity: 0,
        total_price: 0,
        type: '',
      });

      toastifyService.successCreate();
    });
  };

  return (
    <div
      className={`absolute ${
        isPayment ? 'top-3 xl:top-8' : '-top-[2000px]'
      } w-11/12 h-1/2 top-0 left-1/2 -translate-x-1/2 bg-white rounded-lg transition-all duration-300 z-10`}>
      <div className="w-full h-full relative py-20 px-4 flex flex-col gap-10">
        <FaCircleXmark
          size={25}
          onClick={handleCancel}
          className="absolute right-4 top-2 text-primary cursor-pointer"
        />
        <div className="flex items-center gap-x-4">
          <input
            className="w-1/2 bg-gray-100 rounded-lg py-3 px-4 text-sm"
            placeholder="Promo & Voucher"
          />
          <button className="button">Gunakan</button>
        </div>
        <div className="w-1/2 flex items-center gap-x-6 rounded-lg">
          <label htmlFor="bank" className="font-medium text-sm w-[15%]">
            Pilih Bank
          </label>
          <select
            id="bank"
            onChange={handleBankChange}
            value={selectedBank ? selectedBank.name : ''}
            className="bg-gray-100 w-[100%] rounded-lg py-3 px-2 outline-none text-xs xl:text-sm cursor-pointer">
            <option value={'-'}>--- Select ---</option>
            {dataBank.map((data) => (
              <option key={data.id} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        {selectedBank && (
          <div>
            <p className="font-medium text-sm mt-2">No. Rek: {selectedBank.no_rek}</p>
          </div>
        )}
        <p>
          Total :{' '}
          <span className="text-primary font-semibold">
            Rp.{store.total_price.toLocaleString('id-ID')}
          </span>
        </p>
        <p>
          Payment Time Limit :{' '}
          <span className="px-4 py-1 bg-primary text-white rounded-lg mx-2">
            {formatTime(timeRemaining)}
          </span>
        </p>
        <button onClick={handlePayment} className="button">
          Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
