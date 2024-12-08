'use client';
import { useState, useEffect } from 'react';
import PopupEcommerce from './popup.ecommerce';

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState('Wewangian yang Memikat'); // Teks yang berubah
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const images = ['/images/image1.jpg', '/images/image2.jpg', '/images/image3.jpg'];
  const texts = ['Wewangian yang Memikat', 'Harum yang Menenangkan', 'Koleksi Parfum Premium'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      setCurrentText(texts[(currentImage + 1) % texts.length]); // Update text based on current image
    }, 6000);

    return () => clearInterval(interval);
  }, [currentImage, images.length, texts]);

  return (
    <>
      <div
        className="w-full h-screen flex items-center justify-center bg-cover bg-center relative transition-all duration-1000"
        style={{ backgroundImage: `url(${images[currentImage]})` }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative text-center text-white px-6 md:px-12 lg:px-24">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="block text-shadow-lg">Rifki Perfume</span>
            <span className="block text-xl md:text-2xl mt-2 font-semibold opacity-80">
              {currentText} {/* Menampilkan teks yang berubah sesuai gambar */}
            </span>
          </h1>

          <button onClick={handleOpenModal} className="bg-primary px-6 py-2 rounded-lg">
            Beli Sekarang
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      <PopupEcommerce setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </>
  );
};

export default Banner;
