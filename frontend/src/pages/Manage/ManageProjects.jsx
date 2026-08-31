import { ManageCRUD } from './ManageCRUD';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';

const FIELDS = [
  { name: 'slug', label: 'Slug (URL)', placeholder: 'nama-proyek', tableCol: true },
  { name: 'title', label: 'Judul Proyek', tableCol: true },
  { name: 'category', label: 'Kategori', type: 'select', options: ['Web Development', 'Enterprise/ERP', 'Lainnya'], tableCol: true },
  { name: 'tagline', label: 'Tagline', full: true },
  { name: 'thumbnail', label: 'Thumbnail Proyek', type: 'upload', fileType: 'image', full: true },
  { name: 'role', label: 'Role / Posisi', full: true },
  { name: 'tech_stack', label: 'Tech Stack (pisah koma)', type: 'json', full: true, placeholder: 'React.js, Laravel, MySQL' },
  { name: 'background', label: 'Latar Belakang', type: 'textarea', rows: 4, full: true },
  { name: 'solution', label: 'Solusi', type: 'textarea', rows: 4, full: true },
  { name: 'challenges', label: 'Tantangan (pisah koma)', type: 'json', full: true },
  { name: 'features', label: 'Fitur Utama (pisah koma)', type: 'json', full: true },
  { name: 'impact', label: 'Hasil & Dampak', type: 'textarea', full: true },
  { name: 'demo_link', label: 'Link Demo (opsional)' },
  { name: 'repo_link', label: 'Link Repository (opsional)' },
];

export default function ManageProjects() {
  return (
    <ManageCRUD
      title="Proyek Pengembangan"
      fields={FIELDS}
      getAll={getProjects}
      create={createProject}
      update={updateProject}
      remove={deleteProject}
      getItemTitle={item => item.title}
    />
  );
}
