import { ManageCRUD } from './ManageCRUD';
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '../../services/api';

const FIELDS = [
  { name: 'org_name', label: 'Nama Organisasi', tableCol: true },
  { name: 'role', label: 'Jabatan / Role', tableCol: true },
  { name: 'period', label: 'Periode', placeholder: '2023 - 2024', tableCol: true },
  { name: 'slug', label: 'Slug (otomatis terisi, bisa dikosongkan)', placeholder: 'nama-organisasi' },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'description', label: 'Deskripsi Kontribusi', type: 'textarea', full: true },
  { name: 'achievements', label: 'Pencapaian (opsional)', type: 'textarea', full: true, placeholder: 'Daftar pencapaian selama di organisasi ini...' },
  { name: 'logo_url', label: 'Logo Organisasi', type: 'upload', fileType: 'image', full: true },
  { name: 'gallery', label: 'Galeri Foto Kegiatan (upload banyak sekaligus)', type: 'gallery', full: true },
];

export default function ManageOrganizations() {
  return (
    <ManageCRUD
      title="Pengalaman Organisasi"
      fields={FIELDS}
      getAll={getOrganizations}
      create={createOrganization}
      update={updateOrganization}
      remove={deleteOrganization}
      getItemTitle={item => item.org_name}
    />
  );
}
