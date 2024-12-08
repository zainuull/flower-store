'use client';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import { IoIosArrowDown } from 'react-icons/io';

interface PopupEcommerceProps {
  setIsModalOpen: Function; // SetStateAction<boolean> is the type for the setter function of useState
  isModalOpen: boolean;
}

const PopupEcommerce: React.FC<PopupEcommerceProps> = ({ setIsModalOpen, isModalOpen }) => {
  const [newStore, setNewStore] = useState({
    name: '',
    link: '',
    ecommerce: '',
  });
  const [stores, setStores] = useState([
    {
      name: 'Toko Rifki',
      ecommerce: 'Shopee',
      link: 'https://shopee.co.id/Toko-Rifki',
    },
    {
      name: 'Toko A',
      ecommerce: 'Tokopedia',
      link: 'https://tokopedia.com/Toko-A',
    },
    {
      name: 'Toko B',
      ecommerce: 'Blibli',
      link: 'https://www.blibli.com/merchant/Toko-B',
    },
    {
      name: 'Toko C',
      ecommerce: 'Lazada',
      link: 'https://www.lazada.co.id/shop/Toko-C',
    },
  ]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
  };

  const handleAddStore = () => {
    if (editIndex !== null) {
      const updatedStores = stores.map((store, index) => (index === editIndex ? newStore : store));
      setStores(updatedStores);
      setEditIndex(null);
    } else {
      setStores([...stores, newStore]);
    }
    setNewStore({ name: '', link: '', ecommerce: '' });
  };

  const handleDeleteStore = (index: number) => {
    const updatedStores = stores.filter((_, i) => i !== index);
    setStores(updatedStores);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewStore({ ...newStore, [name]: value });
  };

  const handleEditStore = (index: number) => {
    const store = stores[index];
    setNewStore(store);
    setEditIndex(index);
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        sx={{
          width: 400,
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}>
        <Typography variant="h5" gutterBottom>
          Toko Rifki Perfume
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Temukan koleksi wewangian terbaik kami dan lakukan pembelian langsung di berbagai platform
          eCommerce kami.
        </Typography>
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Daftar Toko</h2>

          <ul className="space-y-4">
            {stores.map((store, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-3">
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-800">{store.name}</span>
                  <span className="text-xs font-light">{store.ecommerce}</span>
                </div>
                <a
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-700 transition duration-300">
                  Kunjungi
                </a>
                {/* <button
                  onClick={() => handleEditStore(index)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300">
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStore(index)}
                  className="text-red-500 hover:text-red-700 transition duration-300">
                  Hapus
                </button> */}
              </li>
            ))}
          </ul>
        </div>

        {/* Accordion for Add Store Form */}
        {/* <Accordion>
          <AccordionSummary
            expandIcon={<IoIosArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>{editIndex !== null ? 'Update Store' : 'Add New Store'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Nama Toko"
              variant="outlined"
              fullWidth
              name="name"
              value={newStore.name}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Link Toko"
              variant="outlined"
              fullWidth
              name="link"
              value={newStore.link}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="E-Commerce"
              variant="outlined"
              fullWidth
              name="ecommerce"
              value={newStore.ecommerce}
              onChange={handleInputChange}
              sx={{ marginBottom: 2 }}
            />

            <button onClick={handleAddStore} className="bg-primary px-6 py-2 rounded-lg text-white">
              {editIndex !== null ? 'Update Toko' : 'Tambah Toko'}
            </button>
          </AccordionDetails>
        </Accordion> */}

        <div className="mt-4">
          <button onClick={handleCloseModal} className="bg-primary px-6 py-2 rounded-lg text-white">
            Tutup
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default PopupEcommerce;
