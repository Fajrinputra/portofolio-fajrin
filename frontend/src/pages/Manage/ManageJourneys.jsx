import { ManageCRUD } from './ManageCRUD';
import { getJourneys, createJourney, updateJourney, deleteJourney } from '../../services/api';

const FIELDS = [
  { name: 'level', label: 'Level', type: 'select', options: ['SD', 'SMP', 'SMA', 'Kuliah'], tableCol: true },
  { name: 'institution_name', label: 'Nama Institusi', tableCol: true },
  { name: 'period', label: 'Periode', placeholder: '2010 - 2016' },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
  { name: 'achievement', label: 'Pencapaian (opsional)', type: 'textarea', full: true },
  { name: 'image_url', label: 'URL Foto (opsional)', full: true },
];

export default function ManageJourneys() {
  return (
    <ManageCRUD
      title="Perjalanan Pendidikan"
      fields={FIELDS}
      getAll={getJourneys}
      create={createJourney}
      update={updateJourney}
      remove={deleteJourney}
      getItemTitle={item => `${item.level} — ${item.institution_name}`}
    />
  );
}
