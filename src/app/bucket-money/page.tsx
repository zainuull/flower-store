'use client';
import { DataBucketUang } from '@/data/mock.data';
import { IDataUserModel } from '@/core/interface/IModel';
import { IBucketMoney } from './domain/model/model';
import { useState } from 'react';
import useStore from '../store/store.product';
import Detail from './(presentation)/(components)/detail';
import Payment from './(presentation)/(components)/payment';

interface IPropsBucketMoney {
  user: IDataUserModel;
  setIsOverlay: Function;
  isOverlay: boolean;
  setIsDetail: Function;
  isDetail: boolean;
  setIsPayment: Function;
  isPayment: boolean;
}

const BucketMoney = ({
  user,
  setIsOverlay,
  isOverlay,
  setIsDetail,
  isDetail,
  setIsPayment,
  isPayment,
}: any) => {
  const [selectedFilter, setSelectedFilter] = useState('-');
  const [minPrice, setMinPrice] = useState('-');
  const [maxPrice, setMaxPrice] = useState('-');
  const [data, setData] = useState<IBucketMoney>({
    id: 0,
    title: '',
    price: 0,
    stock: 0,
    type: '',
    imageUrl: '',
    description: '',
  });

  const [store, setStore] = useStore();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxPrice(e.target.value);
  };

  // Generate unique sorted price options
  const priceOptions = ['-'].concat(
    Array.from(new Set(DataBucketUang.map((item) => item.price.toString()))).sort(
      (a, b) => parseInt(a) - parseInt(b)
    )
  );

  const filteredData = DataBucketUang.filter((data) => {
    const matchesType = selectedFilter === '-' || data.type === selectedFilter;
    const matchesMinPrice = minPrice === '-' || data.price >= parseInt(minPrice, 10);
    const matchesMaxPrice = maxPrice === '-' || data.price <= parseInt(maxPrice, 10);
    return matchesType && matchesMinPrice && matchesMaxPrice;
  });

  const handleMenu = (data: IBucketMoney, status: string) => {
    setIsOverlay(!isOverlay);
    setIsDetail(!isDetail);
    if (status === 'detail') {
      setData({
        id: data.id,
        title: data.title,
        price: data.price,
        stock: data.stock,
        type: data.type,
        imageUrl: data.imageUrl,
        description: data.description,
      });
    }
  };

  return (
    <main className="w-full h-full p-2 flex flex-col gap-y-4 relative">
      <span className="w-full flex items-center justify-between px-4">
        <h1 className="text-xl text-primary font-semibold text-center mb-2">New Collection</h1>
        <div className="flex items-center gap-x-2">
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 px-2 outline-none hover:outline-primary transition-all">
            <label htmlFor="min-price" className="font-medium text-sm">
              Min Price
            </label>
            <select
              id="min-price"
              className="bg-transparent rounded-lg h-8 px-2 outline-none text-xs xl:text-sm cursor-pointer"
              value={minPrice}
              onChange={handleMinPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 px-2 outline-none hover:outline-primary transition-all">
            <label htmlFor="max-price" className="font-medium text-sm">
              Max Price
            </label>
            <select
              id="max-price"
              className="bg-transparent rounded-lg h-8 px-2 outline-none text-xs xl:text-sm cursor-pointer"
              value={maxPrice}
              onChange={handleMaxPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 px-2 outline-none hover:outline-primary transition-all">
            <label htmlFor="max-price" className="font-medium text-sm">
              Jenis
            </label>
            <select
              id="type"
              className="bg-transparent rounded-lg h-8 px-2 outline-none text-xs xl:text-sm cursor-pointer"
              value={selectedFilter}
              onChange={handleFilterChange}>
              <option value={'-'}>--- Select ---</option>
              {Array.from(new Set(DataBucketUang.map((data) => data.type))).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </span>
      <div className="w-full grid grid-cols-4 xl:grid-cols-12 gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((data: IBucketMoney) => (
            <div
              key={data.id}
              onClick={() => handleMenu(data, 'detail')}
              className="w-full h-96 flex flex-col rounded-lg p-2 col-span-4 shadow-xl hover:scale-105 transition-all duration-100 cursor-pointer">
              <img src={data.imageUrl} className="object-cover h-4/5" />
              <span className="flex justify-between px-2 mt-4">
                <span>
                  <p className="font-semibold">{data.title}</p>
                  <p className="text-sm font-light">Jenis: {data.type}</p>
                </span>
                <p className="text-primary">Rp.{data.price.toLocaleString()}</p>
              </span>
            </div>
          ))
        ) : (
          <p className="w-full h-full flex items-center justify-center text-5xl text-gray-300 font-semibold col-span-12 mt-10">
            Not have data
          </p>
        )}
      </div>
      {/* Detail */}
      <Detail
        setIsDetail={setIsDetail}
        isDetail={isDetail}
        setIsPayment={setIsPayment}
        isPayment={isPayment}
        setStore={setStore}
        handleMenu={handleMenu}
        data={data}
      />
      {/* Payment */}
      <Payment
        setIsPayment={setIsPayment}
        isPayment={isPayment}
        setStore={setStore}
        store={store}
      />
    </main>
  );
};

export default BucketMoney;
