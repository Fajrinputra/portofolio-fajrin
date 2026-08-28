import { ManageCRUD } from './ManageCRUD';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/api';

const FIELDS = [
  { name: 'title', label: 'Judul Sertifikat', tableCol: true },
  { name: 'issuer', label: 'Penerbit', tableCol: true },
  { name: 'issued_date', label: 'Tanggal', type: 'date' },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'image_url', label: 'URL Gambar Sertifikat', full: true },
  { name: 'credential_url', label: 'URL Verifikasi (opsional)', full: true },
];

export default function ManageCertificates() {
  return (
    <ManageCRUD
      title="Sertifikat & Pencapaian"
      fields={FIELDS}
      getAll={getCertificates}
      create={createCertificate}
      update={updateCertificate}
      remove={deleteCertificate}
      getItemTitle={item => item.title}
    />
  );
}
