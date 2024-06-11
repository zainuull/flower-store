'use client';
import { DataBucketUang } from '@/data/mock.data';
import { useEffect, useState } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';
import { FaCircleXmark } from 'react-icons/fa6';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import VM from '../vm/vm';
import { HandleError } from '@/core/services/handleError/handleError';
import { CountsState } from '../../page';
import { IDataUserModel } from '@/core/interface/IModel';
import Swal from 'sweetalert2';
import { IDataOrderModel } from '../../domain/model/model';
import dayjs from 'dayjs';

interface IDetail {
  setIsDetail: Function;
  isDetail: boolean;
  setIsPayment: Function;
  isPayment: boolean;
  setStore: Function;
  handleMenu: Function;
  id: string;
  user: IDataUserModel;
}

const Detail = (props: IDetail) => {
  const { getDataById, dataById } = VM();
  const { setIsDetail, isDetail, setIsPayment, isPayment, setStore, handleMenu, id, user } = props;
  const notifyService = new NotifyService();
  const data = dataById?.data || {};
  const [counts, setCounts] = useState<CountsState>({});

  useEffect(() => {
    notifyService.showLoading();
    if (isDetail && id) {
      fetchData(id);
    }
  }, [id]);

  useEffect(() => {
    if (data.id) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [data.id as string]: 0, // Type assertion
      }));
    }
  }, [data.id]);

  const fetchData = (id: string) => {
    getDataById(id)
      .then(() => Swal.close())
      .catch((err) => HandleError(err));
  };

  const handleIncrement = (id: string) => {
    if (data && typeof data.quantity === 'number' && counts[id] < data.quantity) {
      setCounts((prevCounts: CountsState) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + 1, // Increment count for the specific id
      }));
    }
  };

  const handleDecrement = (id: string) => {
    if (counts[id] && counts[id] > 0) {
      setCounts((prevCounts: CountsState) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1, // Decrement count for the specific id
      }));
    }
  };

  const handleInputChange = (id: string, value: string) => {
    const newValue = parseInt(value);
    if (
      typeof data.quantity === 'number' &&
      !isNaN(newValue) &&
      newValue >= 0 &&
      newValue <= data.quantity
    ) {
      setCounts((prevCounts: CountsState) => ({
        ...prevCounts,
        [id]: newValue, // Update count for the specific id based on input value
      }));
    }
  };

  const totalPrice = () =>
    Object.entries(counts).reduce((acc, [id, count]) => {
      let price: number = 0;
      if (
        typeof data.original_price === 'number' &&
        typeof data.discount_price === 'number' &&
        typeof data.flash_sale_price === 'number'
      ) {
        if (data.is_discount) {
          price = data.discount_price;
        } else if (data.is_flash_sale) {
          price = data.flash_sale_price;
        } else {
          price = data.original_price;
        }
      }
      return acc + (price || 0) * count;
    }, 0);

  const handleSubmit = () => {
    const dateTimeFormat = 'YYYY-MM-DD HH:mm';
    const currentDate = dayjs().format(dateTimeFormat);

    if (!user.token) {
      notifyService.mustLogin().then((res) => {
        if (res) {
          if (user.role?.includes('Clinet')) {
            window.location.href = '/login-admin';
          } else {
            window.location.href = '/login-customer';
          }
        }
      });
    }

    if (user.role === 'Customer') {
      notifyService.confirmationCreate().then((res) => {
        if (res) {
          const payload: IDataOrderModel = {
            customer_name: user.name,
            product_name: data.name,
            client: 'Rini',
            price: Number(data.flash_sale_price || data.discount_price || data.original_price),
            quantity: counts[data?.id || ''],
            total_price: totalPrice(),
            category: data.category,
            created_at: currentDate,
            product_id: data.id,
            user_id: `${process.env.NEXT_PUBLIC_USER_ID}`,
          };
          setStore(payload);
          setIsDetail(!isDetail);
          setIsPayment(!isPayment);
        }
      });
    } else {
      notifyService.customerFeature();
    }
  };

  console.log(counts[data?.id || '']);

  return (
    <div
      className={`absolute ${
        isDetail ? 'top-28 xl:top-1/2 xl:-translate-y-1/2' : '-top-[1000px]'
      } w-full xl:w-11/12 min-h-40 xl:h-4/5 left-1/2 -translate-x-1/2 bg-white rounded-lg transition-all duration-300 z-10 overflow-hidden pb-5 xl:pb-0`}>
      <div className="w-full h-full relative xl:py-20 xl:px-4 grid grid-cols-12 gap-2 xl:gap-5">
        <FaCircleXmark
          size={25}
          onClick={() => handleMenu(data, 'close')}
          className="absolute right-2  xl:right-4 top-2 text-primary w-[15px] h-[15px] xl:w-[25px] xl:h-[25px] cursor-pointer"
        />
        <img
          src={data.imageUrl}
          className="object-cover h-full col-span-12 xl:col-span-5 overflow-hidden"
        />
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-y-4">
          <h1 className="font-semibold text-xs xl:text-xl px-2 xl:px-0">{data.name}</h1>
          <span className="text-xs xl:text-base border-y-2 border-black/60 p-2 xl:mb-5 flex items-center justify-between">
            <span className="flex items-center gap-x-1">
              <p
                className={`${
                  data.is_discount || data.is_flash_sale
                    ? 'line-through text-black'
                    : 'text-primary '
                }`}>
                Rp.{data.original_price?.toLocaleString()}
              </p>
              {(data.is_discount || data.is_flash_sale) && (
                <p className="text-primary">
                  Rp.
                  {data.is_flash_sale && data.flash_sale_price
                    ? data.flash_sale_price.toLocaleString()
                    : data.is_discount && data.discount_price
                    ? data.discount_price.toLocaleString()
                    : data.original_price?.toLocaleString()}
                </p>
              )}
            </span>
            <p>
              Stock: <span className="text-primary font-semibold">{data.quantity}</span>
            </p>
          </span>
          <p className="text-xs xl:text-sm px-2 xl:px-0">{data.description}</p>
          <div className="flex flex-col xl:flex-row justify-between gap-y-4 xl:gap-x-4 xl:mt-10 px-2 xl:px-0">
            <span className="xl:w-1/3 flex justify-evenly items-center xl:gap-x-2 bg-gray-100 rounded-lg xl:px-6">
              <button
                onClick={() => handleDecrement(data?.id || '')}
                disabled={counts[data?.id || ''] <= 0}
                className={`cursor-pointer ${
                  counts[data?.id || ''] <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                <FaCircleMinus
                  size={25}
                  className="text-primary rounded-full w-[18px] h-[18px] xl:w-[25px] xl:h-[25px]"
                />
              </button>
              <input
                value={counts[data?.id || 0]}
                onChange={(e) => handleInputChange(data?.id || '', e.target.value || '0')}
                className="w-12 h-8 outline-none px-1 text-primary text-center bg-transparent text-xs xl:text-base"
                maxLength={4}
              />
              <button
                onClick={() => handleIncrement(data?.id || '')}
                disabled={
                  typeof data.quantity === 'number' && counts[data?.id || ''] >= data?.quantity
                }
                className={`cursor-pointer ${
                  typeof data.quantity === 'number' && counts[data?.id || ''] >= data?.quantity
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}>
                <FaCirclePlus
                  size={25}
                  className="text-primary rounded-full w-[18px] h-[18px] xl:w-[25px] xl:h-[25px]"
                />
              </button>
            </span>

            <span className="flex justify-between xl:items-center gap-x-4 text-xs xl:text-base">
              <span>
                <p>Total Price</p>
                <h1 className="font-semibold text-primary">
                  Rp. {totalPrice().toLocaleString('id-ID')}
                </h1>
              </span>
              <button
                onClick={handleSubmit}
                className={`px-3 py-1 xl:px-6 xl:py-2 rounded-lg ${
                  Object.values(counts).some((count) => count > 0)
                    ? 'bg-primary'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white`}
                disabled={!Object.values(counts).some((count) => count > 0)}>
                Send Request
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
