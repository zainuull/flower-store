'use client';
import { DataBucketUang } from '@/data/mock.data';
import { useEffect, useState } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';
import { FaCircleXmark } from 'react-icons/fa6';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import VM from '../vm/vm';
import { HandleError } from '@/core/services/handleError/handleError';
import { CountsState } from '../../page';

interface IDetail {
  setIsDetail: Function;
  isDetail: boolean;
  setIsPayment: Function;
  isPayment: boolean;
  setStore: Function;
  handleMenu: Function;
  id: string;
}

const Detail = (props: IDetail) => {
  const { getDataById, dataById } = VM();
  const { setIsDetail, isDetail, setIsPayment, isPayment, setStore, handleMenu, id } = props;
  const notifyService = new NotifyService();
  const data = dataById?.data || {};
  const [counts, setCounts] = useState<CountsState>({});

  useEffect(() => {
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
    getDataById(id).catch((err) => HandleError(err));
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
    notifyService.confirmationCreate().then((res) => {
      if (res) {
        setIsDetail(!isDetail);
        setIsPayment(!isPayment);
        // setStore(counts);
      }
    });
  };

  return (
    <div
      className={`absolute ${
        isDetail ? 'top-28 xl:top-1/2 xl:-translate-y-1/2' : '-top-[1000px]'
      } w-full xl:w-11/12 min-h-40 xl:h-4/5 left-1/2 -translate-x-1/2 bg-white rounded-lg transition-all duration-300 z-10 overflow-hidden pb-5 xl:pb-0`}>
      <div className="w-full h-full relative xl:py-20 xl:px-4 grid grid-cols-12 gap-2 xl:gap-5">
        <FaCircleXmark
          size={25}
          onClick={() => handleMenu(data, 'close')}
          className="absolute right-2  xl:right-4 top-2 text-primary w-[10px] h-[10px] xl:w-[25px] xl:h-[25px] cursor-pointer"
        />
        <img
          src={data.imageUrl}
          className="object-cover h-full col-span-12 xl:col-span-5 overflow-hidden"
        />
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-y-4">
          <h1 className="font-semibold text-[8px] xl:text-xl px-2 xl:px-0">{data.name}</h1>
          <span className="text-[8px] xl:text-base border-y-2 border-black/60 p-2 xl:mb-5 flex items-center justify-between">
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
          <p className="text-[8px] xl:text-sm px-2 xl:px-0">{data.description}</p>
          <div className="flex justify-between xl:gap-x-4 xl:mt-10 px-2 xl:px-0">
            <span className="w-1/3 flex justify-evenly items-center xl:gap-x-2 bg-gray-100 rounded-lg xl:px-6">
              <button
                onClick={() => handleDecrement(data?.id || '')}
                disabled={counts[data?.id || ''] <= 0}
                className={`cursor-pointer ${
                  counts[data?.id || ''] <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}>
                <CiCircleMinus size={25} className="w-[10px] h-[10px] xl:w-[25px] xl:h-[25px]" />
              </button>
              <input
                value={counts[data?.id || 0]}
                onChange={(e) => handleInputChange(data?.id || '', e.target.value || '0')}
                className="w-12 outline-none px-1 text-primary text-center bg-transparent text-[8px] xl:text-base"
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
                <CiCirclePlus size={25} className="w-[10px] h-[10px] xl:w-[25px] xl:h-[25px]" />
              </button>
            </span>

            <span className="flex items-center gap-x-4 text-[8px] xl:text-base">
              <span>
                <p>Total Price</p>
                <h1 className="font-semibold text-primary">
                  Rp. {totalPrice().toLocaleString('id-ID')}
                </h1>
              </span>
              <button
                onClick={handleSubmit}
                className={`px-6 py-2 rounded-lg ${
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
