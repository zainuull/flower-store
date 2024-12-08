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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import PopupEcommerce from '../(sharedComponents)/popup.ecommerce';

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
  const [selectedProduct, setSelectedProduct] = useState<IDataProductsModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState({
    detail: false,
    ecommerce: false,
  });

  const handleOpenModal = () => {
    setIsModalOpen({
      detail: false,
      ecommerce: true,
    });
  };

  const handleMenu = (productId: string, quantity: number, action: string) => {
    if (action === 'detail') {
      // Temukan produk yang dipilih dari data produk dan set ke state
      const selected = filteredData.find((product) => product.id === productId);
      setSelectedProduct(selected || null);
      setIsModalOpen({
        detail: true,
        ecommerce: false,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen({
      detail: false,
      ecommerce: false,
    });
  };

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
    <main id="produk" className="w-full min-h-screen xl:p-6 flex flex-col gap-y-8 mt-12">
      {/* Filter Dropdown */}
      <section className="w-full flex flex-col gap-6">
        <h1 className="text-2xl xl:text-3xl text-primary font-semibold text-center mb-4">
          All Products
        </h1>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
          {/* Min Price Filter */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <label
              htmlFor="min-price"
              className="font-medium text-sm text-gray-600 block px-4 py-3">
              Min Price
            </label>
            <select
              id="min-price"
              className="w-full bg-transparent rounded-lg text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
              value={minPrice}
              onChange={handleMinPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price.toString()}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Filter */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <label
              htmlFor="max-price"
              className="font-medium text-sm text-gray-600 block px-4 py-3">
              Max Price
            </label>
            <select
              id="max-price"
              className="w-full bg-transparent rounded-lg text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
              value={maxPrice}
              onChange={handleMaxPriceChange}>
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price === '-' ? '--- Select ---' : price.toString()}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <label htmlFor="category" className="font-medium text-sm text-gray-600 block px-4 py-3">
              Jenis
            </label>
            <select
              id="category"
              className="w-full bg-transparent rounded-lg text-sm px-4 py-3 outline-none focus:ring-2 focus:ring-primary transition-all"
              value={selectedCategory}
              onChange={handleCategoryChange}>
              <option value={'-'}>--- Select Category ---</option>
              {category?.map((data: IDataCategoryModel) => (
                <option key={data.id} value={data?.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 px-4 py-6">
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
                  data.quantity === 0 ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                } w-full flex flex-col rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 relative overflow-hidden`}>
                {/* Gambar Produk */}
                <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
                  <Image
                    src={data?.imageUrl || '/placeholder.jpg'}
                    alt={data?.name || 'Product Image'}
                    layout="fill"
                    className="object-cover rounded-t-lg transition-all duration-200 ease-in-out hover:scale-105"
                  />
                  {(data.is_discount || data.is_flash_sale) && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold py-1 px-2 rounded-full shadow-lg">
                      {Math.round(parseInt(discountPercentage))}% OFF
                    </div>
                  )}
                  {data.quantity === 0 && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center text-white text-xl font-bold uppercase tracking-wider">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Detail Produk */}
                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base text-gray-900 font-semibold truncate">{data.name}</h3>
                    <p className="text-xs text-gray-500 font-medium truncate">{data.category}</p>
                  </div>

                  {/* Harga */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <p
                        className={`text-xs font-semibold ${
                          data.is_discount || data.is_flash_sale
                            ? 'line-through text-gray-500'
                            : 'text-gray-800'
                        }`}>
                        Rp.{data.original_price?.toLocaleString()}
                      </p>
                      {(data.is_discount || data.is_flash_sale) && (
                        <p className="text-sm font-semibold text-primary">
                          Rp.
                          {data.is_flash_sale && data.flash_sale_price
                            ? data.flash_sale_price.toLocaleString()
                            : data.is_discount && data.discount_price
                            ? data.discount_price.toLocaleString()
                            : data.original_price?.toLocaleString()}
                        </p>
                      )}
                    </div>
                    {/* Total Penjualan */}
                    {/* <div className="text-xs text-gray-600">
                      <span className="font-semibold">Penjualan:</span>{' '}
                      {data.total_sales?.toLocaleString() || '0'} pcs
                    </div> */}
                  </div>

                  {/* Rating */}
                  {/* <div className="flex items-center gap-1 text-sm text-yellow-500">
                    {'★'.repeat(data.rating)} {'☆'.repeat(5 - data.rating)}
                    <span className="ml-1 text-gray-400">({data.rating})</span>
                  </div> */}

                  {/* Button View Details */}
                  <button
                    onClick={() => handleMenu(data.id || '', data.quantity || 0, 'detail')}
                    className="bg-primary text-white py-1 px-4 rounded-lg shadow-md hover:scale-105 transition-all duration-200 ease-in-out text-sm">
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="w-full h-full flex items-center justify-center text-xl text-center text-gray-300 font-semibold col-span-12 mt-10">
            No products available
          </p>
        )}
      </section>

      {/* Modal */}
      {isModalOpen.detail && selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}>
          <div
            className="bg-white p-8 rounded-lg w-full max-w-2xl relative shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              {/* Product Name */}
              <h2 className="text-3xl font-semibold text-primary">{selectedProduct.name}</h2>
              {/* Close Button */}
              <button onClick={closeModal} className="text-primary text-xl font-bold">
                X
              </button>
            </div>

            {/* Product Description */}
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

            {/* Sales and Rating */}
            <div className="flex justify-between items-center mb-4">
              {/* <p className="text-sm text-gray-500">
                Penjualan: {selectedProduct.total_sales?.toLocaleString() || '0'} pcs
              </p>
              <div className="flex items-center gap-1 text-yellow-500">
                {'★'.repeat(selectedProduct.rating)} {'☆'.repeat(5 - selectedProduct.rating)}
                <span className="ml-1 text-gray-400">Rating: ({selectedProduct.rating})</span>
              </div> */}
            </div>

            {/* Single Product Image */}
            <div className="mt-6 mb-4 w-full h-72 bg-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <Image
                src={selectedProduct.imageUrl || '/placeholder.jpg'}
                alt="Product Image"
                layout="fill"
                className="object-cover rounded-lg"
              />
            </div>

            <button
              onClick={handleOpenModal}
              className="bg-primary px-6 py-2 rounded-lg text-white">
              Beli Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Modal Popup */}
      <PopupEcommerce setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen.ecommerce} />
    </main>
  );
};

export default BucketMoney;
