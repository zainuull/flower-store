import { NotifyService, ToastifyService } from '@/core/services/notify/notifyService';
import { dataBank, IBankModel } from '@/data/mock.data';
import { useEffect, useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { IDataOrderModel } from '../../domain/model/model';
import useOverlay from '@/app/store copy/store.notif';
import { UploadImage } from './upload.image';
import VM from '../vm/vm';
import { HandleError } from '@/core/services/handleError/handleError';

interface IPayment {
  setIsPayment: Function;
  isPayment: boolean;
  setStore: Function;
  store: IDataOrderModel;
}

const Payment = (props: IPayment) => {
  const { createOrder } = VM();
  const { setIsPayment, isPayment, setStore, store } = props;
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const notifyService = new NotifyService();
  const toastifyService = new ToastifyService();
  const [isOverlay, setIsOverlay] = useOverlay();
  const [selectedBank, setSelectedBank] = useState<IBankModel>();
  const [dataInput, setDataInput] = useState({
    public_id: '',
    imageUrl: '',
  });

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
              window.location.reload();
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
      }
    });
  };

  const handlePayment = () => {
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        createOrder(store)
          .then(() => {
            toastifyService.successCreate();
            setIsOverlay(!isOverlay);
            setIsPayment(!isPayment);
            setStore({
              product_id: '',
              user_id: '',
              customer_name: '',
              product_name: '',
              client: '',
              price: 0,
              quantity: 0,
              total_price: 0,
              category: '',
              created_at: '',
            });
            setDataInput({
              public_id: '',
              imageUrl: '',
            });
          })
          .catch((err) => {
            HandleError(err);
          });
      }
    });
  };

  return (
    <div
      className={`absolute ${
        isPayment ? 'top-28 xl:top-1/2 xl:-translate-y-1/2' : '-top-[1000px]'
      } w-full xl:w-11/12 min-h-40 left-1/2 -translate-x-1/2 bg-white rounded-lg transition-all duration-300 z-10 pb-5 text-[8px] xl:text-bas`}>
      <div className="w-full h-full relative py-4 xl:py-20 px-4 flex flex-col gap-4 xl:gap-10">
        <FaCircleXmark
          size={25}
          onClick={handleCancel}
          className="absolute right-2  xl:right-4 top-2 text-primary w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] cursor-pointer"
        />
        <div className="flex items-center gap-x-2 xl:gap-x-4">
          <input
            className="w-1/2 bg-gray-100 rounded-lg p-2 xl:py-3 xl:px-4"
            placeholder="Promo & Voucher"
          />
          <button className="button">Gunakan</button>
        </div>
        <div className="xl:w-1/2 flex items-center gap-x-3 xl:gap-x-6 rounded-lg">
          <label htmlFor="bank" className="font-medium w-1/4 xl:w-[15%]">
            Pilih Bank<span className="text-primary">*</span>
          </label>
          <select
            id="bank"
            onChange={handleBankChange}
            value={selectedBank ? selectedBank.name : ''}
            className="bg-gray-100 w-[100%] rounded-lg p-2 xl:py-3 xl:px-2 outline-none cursor-pointer">
            <option value={'-'}>--- Select ---</option>
            {dataBank.map((data) => (
              <option key={data.id} value={data.name}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p className="font-medium xl:mt-2">No. Rek: {selectedBank?.no_rek}</p>
        </div>
        <p>
          Total :{' '}
          <span className="text-primary font-semibold">
            Rp.{store.total_price?.toLocaleString('id-ID')}
          </span>
        </p>
        <p>
          Payment Time Limit :{' '}
          <span className="px-4 py-1 bg-primary text-white rounded-lg mx-2">
            {formatTime(timeRemaining)}
          </span>
        </p>

        <div className="flex flex-col gap-y-1">
          <label htmlFor="uploadImage" className="font-medium">
            Upload Bukti Payment<span className="text-red-600">*</span>
          </label>
          <UploadImage setDataInput={setDataInput} dataInput={dataInput} />
        </div>
        <button
          onClick={handlePayment}
          className={`${dataInput.imageUrl && selectedBank?.id ? 'button' : 'disabled-button'}`}
          disabled={dataInput.imageUrl ? false : true}>
          Kirim
        </button>
      </div>
    </div>
  );
};

export default Payment;
