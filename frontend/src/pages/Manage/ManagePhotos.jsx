import { ManageCRUD } from './ManageCRUD';
import { getPhotos, createPhoto, updatePhoto, deletePhoto } from '../../services/api';

const FIELDS = [
  { name: 'title', label: 'Judul Foto', tableCol: true },
  { name: 'category', label: 'Kategori', placeholder: 'Wedding', tableCol: true },
  { name: 'image_url', label: 'File Foto', type: 'upload', fileType: 'image', full: true },
  { name: 'client_name', label: 'Nama Klien (opsional)' },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
];

export default function ManagePhotos() {
  return (
    <ManageCRUD
      title="Foto Freelance"
      fields={FIELDS}
      getAll={getPhotos}
      create={createPhoto}
      update={updatePhoto}
      remove={deletePhoto}
      getItemTitle={item => item.title || item.category}
    />
  );
}
