import { ManageCRUD } from './ManageCRUD';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/api';

const FIELDS = [
  { name: 'title', label: 'Judul Sertifikat' },
  { name: 'issuer', label: 'Penerbit', tableCol: true },
  { name: 'category', label: 'Kategori', tableCol: true, placeholder: 'mis. Programming, Design, Data Science, Networking' },
  { name: 'issued_date', label: 'Tanggal Terbit', type: 'date' },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'image_url', label: 'Gambar Sertifikat', type: 'upload', fileType: 'image', full: true },
  { name: 'credential_url', label: 'URL Verifikasi (opsional)', full: true },
];

export default function ManageCertificates() {
  return (
    <ManageCRUD
      title="Sertifikat & Pencapaian"
      titleColLabel="Judul Sertifikat"
      fields={FIELDS}
      getAll={getCertificates}
      create={createCertificate}
      update={updateCertificate}
      remove={deleteCertificate}
      getItemTitle={item => item.title}
    />
  );
}
