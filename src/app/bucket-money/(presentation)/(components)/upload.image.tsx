'use client';
import { GoUpload } from 'react-icons/go';
import Image from 'next/image';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { useState } from 'react';
import { NotifyService } from '@/core/services/notify/notifyService';
import { IDataProductsModel } from '@/core/interface/IModel';

interface IUploadImage {
  setDataInput: Function;
  dataInput: IDataProductsModel;
}

export const UploadImage = ({ setDataInput, dataInput }: IUploadImage) => {
  // const { deleteImage } = useViewModel();
  const [publicId, setPublicId] = useState('');
  const notifyService = new NotifyService();

  const handleUploadImage = (res: CloudinaryUploadWidgetResults) => {
    const info = res.info as object;

    if ('secure_url' in info && 'public_id' in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;

      setDataInput({ ...dataInput, public_id: public_id, imageUrl: url });
      setPublicId(public_id);
    }
  };

  const handleDeleteImage = async (e: React.FormEvent) => {
    e.preventDefault();
    notifyService.confirmationDelete().then(async (res) => {
      if (res) {
        try {
          const res = await fetch(`/api/delete-image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ publicId }),
          });
          if (res.ok) {
            setDataInput({ ...dataInput, public_id: '', imageUrl: '' });
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onUpload={handleUploadImage}
        className={`relative w-full h-52 bg-slate-100 flex items-center justify-center ${
          dataInput?.imageUrl && 'pointer-events-none'
        }`}>
        <GoUpload size={25} className="w-[20px] h-[20px] xl:w-[25px] xl:h-[25px]" />
        {dataInput?.imageUrl ||
          ('' && (
            <Image
              src={dataInput?.imageUrl || ''}
              alt={dataInput?.name || ''}
              width={300}
              height={300}
              className="absolute w-full h-52 object-cover inset-0"
            />
          ))}
      </CldUploadButton>
      {dataInput?.imageUrl && (
        <button
          onClick={handleDeleteImage}
          className="bg-red-600 text-white py-2 text-sm rounded-lg w-[150px] hover:bg-red-700 transition-all mx-2">
          Delete Image
        </button>
      )}
    </>
  );
};
