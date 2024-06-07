'use client';
import { DataBucketUang } from '@/data/mock.data';
import { useState } from 'react';
import { IBucketMoney, IStore } from '../../domain/model/model';
import { NotifyService } from '@/core/services/notify/notifyService';
import { FaCircleXmark } from 'react-icons/fa6';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';

export interface CountsState {
  [id: number]: number;
}

interface IDetail {
  setIsDetail: Function;
  isDetail: boolean;
  setIsPayment: Function;
  isPayment: boolean;
  setStore: Function;
  handleMenu: Function;
  data: IBucketMoney;
}

const Detail = (props: IDetail) => {
  const { setIsDetail, isDetail, setIsPayment, isPayment, setStore, handleMenu, data } = props;
  const [counts, setCounts] = useState<CountsState>({});
  const notifyService = new NotifyService();

  const handleIncrement = (id: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1, // Increment count for the specific id
    }));
  };

  const handleDecrement = (id: number) => {
    if (counts[id] && counts[id] > 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1, // Decrement count for the specific id
      }));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 0) {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [id]: newValue, // Update count for the specific id based on input value
      }));
    }
  };

  const totalPrice = () =>
    Object.entries(counts).reduce(
      (acc, [id, count]) =>
        acc + (DataBucketUang.find((data) => data.id === parseInt(id))?.price || 0) * count,
      0
    );

  const dataEntries = Object.entries(counts);
  const handleSubmit = () => {
    const count = dataEntries.map(([id, count]) => count);

    const payload: IStore = {
      id: data.id,
      title: data.title,
      imageUrl: data.imageUrl,
      quantity: count[0],
      total_price: totalPrice(),
      type: data.type,
    };

    notifyService.confirmationCreate().then((res) => {
      if (res) {
        setIsDetail(!isDetail);
        setIsPayment(!isPayment);
        setStore(payload);
      }
    });
  };

  return (
    <div
      className={`absolute ${
        isDetail ? 'top-3 xl:top-8' : '-top-[4000px]'
      } w-11/12 h-4/5 top-0 left-1/2 -translate-x-1/2 bg-white rounded-lg transition-all duration-300 z-10`}>
      <div className="w-full h-full relative py-20 px-4 grid grid-cols-12 gap-5">
        <FaCircleXmark
          size={25}
          onClick={() => handleMenu(data, 'close')}
          className="absolute right-4 top-2 text-primary cursor-pointer"
        />
        <img src={data.imageUrl} className="object-cover col-span-5 w-full h-full" />
        <div className="col-span-7 flex flex-col gap-y-4">
          <h1 className="text-xl font-semibold">{data.title}</h1>
          <span className="border-y-2 border-black/60 p-2 mb-5 flex items-center justify-between">
            <p className=" text-primary font-semibold text-lg">Rp.{data.price.toLocaleString()}</p>
          </span>
          <p className="text-sm">{data.description}</p>
          <div className="flex justify-between gap-x-4 mt-10">
            <span className="w-1/3 flex justify-evenly items-center gap-x-2 bg-gray-100 rounded-lg px-6">
              <button onClick={() => handleDecrement(data?.id || 0)}>
                <CiCircleMinus size={25} />
              </button>
              <input
                value={counts[data.id || 0] || 0}
                onChange={(e) => handleInputChange(data?.id || 0, e.target.value || '0')}
                className="w-12 outline-none px-1 text-primary text-center bg-transparent"
                maxLength={4}
              />
              <button onClick={() => handleIncrement(data?.id || 0)}>
                <CiCirclePlus size={25} />
              </button>
            </span>
            <span className="flex items-center gap-x-4">
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
