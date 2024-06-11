'use client';
import { IDataCategoryModel, IDataProductsModel, IDataUserModel } from '@/core/interface/IModel';
import { IBucketMoney } from './domain/model/model';
import { useState, useEffect } from 'react';
import useStore from '../store/store.product';
import Detail from './(presentation)/(components)/detail';
import Payment from './(presentation)/(components)/payment';
import { NotifyService } from '@/core/services/notify/notifyService';
import VM from './(presentation)/vm/vm';
import Swal from 'sweetalert2';
import { HandleError } from '@/core/services/handleError/handleError';
import { IQueryModel } from '@/core/interface/IQueryModel';
import Image from 'next/image';

export interface CountsState {
  [id: string]: number;
}

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
  const { getData, datas, getCategory, categories } = VM();
  const notifyService = new NotifyService();
  const [selectedCategory, setSelectedCategory] = useState('-');
  const [minPrice, setMinPrice] = useState('-');
  const [maxPrice, setMaxPrice] = useState('-');
  const [id, setId] = useState<string>('');
  const [store, setStore] = useStore();
  const result = datas?.data || [];
  const category = categories?.data || [];

  useEffect(() => {
    notifyService.showLoading();
    const payload: IQueryModel = {
      user_id: `${process.env.NEXT_PUBLIC_USER_ID}`,
    };
    fetchData(payload);
  }, []);

  const fetchData = async (query: IQueryModel) => {
    await getData(query)
      .then(() => Swal.close())
      .catch((err) => HandleError(err));
    await getCategory(query)
      .then(() => Swal.close())
      .catch((err) => HandleError(err));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMaxPrice(e.target.value);
  };

  // Generate unique sorted price options
  const priceOptions = ['-'].concat(
    Array.from(
      new Set(
        result.map((item: IDataProductsModel) =>
          item.original_price !== undefined ? item.original_price.toString() : '0'
        )
      )
    ).sort((a, b) => parseInt(a) - parseInt(b))
  );

  const filteredData = result.filter((data: IDataProductsModel) => {
    // Ensure original_price is treated as a number and provide a default value if undefined
    const originalPrice = data.original_price !== undefined ? Number(data.original_price) : 0;

    const matchesType = selectedCategory === '-' || data.category === selectedCategory;
    const matchesMinPrice = minPrice === '-' || originalPrice >= parseInt(minPrice, 10);
    const matchesMaxPrice = maxPrice === '-' || originalPrice <= parseInt(maxPrice, 10);

    return matchesType && matchesMinPrice && matchesMaxPrice;
  });

  const handleMenu = (id: string, qty: number, status: string) => {
    if (qty !== 0) {
      setIsOverlay(!isOverlay);
      setIsDetail(!isDetail);
      // setIsPayment(!isPayment);
      if (status === 'detail') {
        setId(id);
      }
    }
  };

  function calculateDiscountPercentage(
    originalPrice: number | string | undefined,
    discountPrice: number | string | undefined,
    flashSalePrice: number | string | undefined,
    isDiscount: boolean | undefined,
    isFlashSale: boolean | undefined
  ): string {
    // Convert prices to numbers or set to 0 if undefined
    const original =
      typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice || '0');
    const discount =
      typeof discountPrice === 'number' ? discountPrice : parseFloat(discountPrice || '0');
    const flashSale =
      typeof flashSalePrice === 'number' ? flashSalePrice : parseFloat(flashSalePrice || '0');

    let effectivePrice = original;

    if (isFlashSale && flashSale > 0) {
      effectivePrice = flashSale;
    } else if (isDiscount && discount > 0) {
      effectivePrice = discount;
    }

    const discountPercentage = ((original - effectivePrice) / original) * 100;
    return discountPercentage.toFixed(2); // Returns percentage with 2 decimal places
  }

  return (
    <main className="w-full min-h-screen xl:p-2 flex flex-col xl:gap-y-4 overflow-hidden">
      {/* Filter Dropdown */}
      <span className="w-full flex flex-col xl:flex-row items-center justify-between px-4">
        <h1 className="text-[10px] xl:text-xl text-primary font-semibold text-center my-2 xl:my-0 xl:mb-2">
          New Collection
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-12 mb-4 xl:mb-0 gap-2">
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 xl:px-2 outline-none hover:outline-primary transition-all col-span-1 xl:col-span-4">
            <label htmlFor="min-price" className="font-medium text-[8px] xl:text-sm">
              Min Price
            </label>
            <select
              id="min-price"
              className="bg-transparent rounded-lg xl:h-8 xl:px-2 outline-none text-[8px] xl:text-sm cursor-pointer"
              value={minPrice}
              onChange={handleMinPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price.toString()}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 xl:px-2 outline-none hover:outline-primary transition-all col-span-1 xl:col-span-4">
            <label htmlFor="max-price" className="font-medium text-[8px] xl:text-sm">
              Max Price
            </label>
            <select
              id="max-price"
              className="bg-transparent rounded-lg xl:h-8 xl:px-2 outline-none text-[8px] xl:text-sm cursor-pointer"
              value={maxPrice}
              onChange={handleMaxPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price.toString()}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-gray-100 flex items-center gap-x-1 rounded-lg p-1 xl:px-2 outline-none hover:outline-primary transition-all col-span-2 xl:col-span-4">
            <label htmlFor="category" className="font-medium text-[8px] xl:text-sm">
              Jenis
            </label>
            <select
              id="category"
              className="bg-transparent rounded-lg xl:h-8 xl:px-2 outline-none text-[8px] xl:text-sm cursor-pointer"
              value={selectedCategory}
              onChange={handleCategoryChange}>
              <option value={'-'}>--- Select Category ---</option>
              {category?.map((data: IDataCategoryModel) => {
                return (
                  <option key={data.id} value={data?.name}>
                    {data.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </span>
      {/* Cards */}
      <div className="w-full grid grid-cols-4 xl:grid-cols-12 gap-2 xl:gap-5">
        {filteredData?.length ? (
          filteredData.map((data: IDataProductsModel) => {
            const discountPercentage = calculateDiscountPercentage(
              data.original_price,
              data.discount_price,
              data.flash_sale_price,
              data.is_discount,
              data.is_flash_sale
            );
            return (
              <div
                key={data.id}
                onClick={() => handleMenu(data.id || '', data.quantity || 0, 'detail')}
                className={`${
                  data.quantity === 0 ? 'cursor-not-allowed' : 'cursor-pointer'
                } w-full xl:h-96 flex flex-col rounded-lg col-span-2 xl:col-span-4 shadow-md xl:shadow-xl xl:hover:scale-105 transition-all duration-100 relative`}>
                <Image
                  src={data?.imageUrl || ''}
                  alt={data?.name || ''}
                  width={400}
                  height={400}
                  className="object-cover xl:h-4/5"
                />
                <span className="flex flex-col xl:flex-row justify-between px-2 mt-2 xl:mt-4">
                  <span>
                    <p className="font-semibold text-[10px] xl:text-base">{data.name}</p>
                    <p className="text-[8px] xl:text-sm font-light">Jenis: {data.category}</p>
                  </span>
                  <span className="flex items-center gap-x-1 text-[8px] xl:text-base">
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
                </span>
                {(data.discount_price || data.is_flash_sale) && (
                  <p className="text-red-500 font-semibold absolute right-2 top-2 xl:right-4 xl:top-3 text-[7px] xl:text-base">
                    {Math.round(parseInt(discountPercentage))}%
                  </p>
                )}
                {data.quantity === 0 && (
                  <span className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center text-white">
                    Stock Habis
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="w-full h-full flex items-center justify-center text-2xl xl:text-5xl text-center text-gray-300 font-semibold col-span-12 mt-10">
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
        id={id}
        user={user}
      />
      {/* Payment */}
      <Payment
        setIsPayment={setIsPayment}
        isPayment={isPayment}
        setStore={setStore}
        store={store}
        fetchData={fetchData}
      />
    </main>
  );
};

export default BucketMoney;
