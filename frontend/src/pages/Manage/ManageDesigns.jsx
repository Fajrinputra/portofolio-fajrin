import { ManageCRUD } from './ManageCRUD';
import { getDesigns, createDesign, updateDesign, deleteDesign } from '../../services/api';

const FIELDS = [
  { name: 'slug', label: 'Slug (URL)', placeholder: 'nama-design', tableCol: true },
  { name: 'title', label: 'Judul Design', tableCol: true },
  { name: 'category', label: 'Kategori', placeholder: 'Mobile App', tableCol: true },
  { name: 'thumbnail', label: 'Thumbnail', type: 'upload', fileType: 'image', full: true },
  { name: 'figma_link', label: 'Link Figma', full: true },
  { name: 'sort_order', label: 'Urutan', type: 'number' },
  { name: 'tags', label: 'Tags (pisahkan koma)', type: 'tags', full: true, placeholder: 'Dashboard, Finance, Web App, Prototype' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', rows: 4, full: true },
  { name: 'process', label: 'Proses Desain', type: 'textarea', rows: 3, full: true, placeholder: 'Riset → Wireframe → Hi-Fi → Prototype' },
];

export default function ManageDesigns() {
  return (
    <ManageCRUD
      title="Design UI/UX"
      fields={FIELDS}
      getAll={getDesigns}
      create={createDesign}
      update={updateDesign}
      remove={deleteDesign}
      getItemTitle={item => item.title}
    />
  );
}
