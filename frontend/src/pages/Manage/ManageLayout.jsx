import { useState, Suspense, lazy } from 'react';
import { AlertTriangle, User, Map, Building2, Code2, Palette, Camera, Award } from 'lucide-react';

const ManageProfil = lazy(() => import('./ManageProfil'));
const ManageJourneys = lazy(() => import('./ManageJourneys'));
const ManageOrganizations = lazy(() => import('./ManageOrganizations'));
const ManageProjects = lazy(() => import('./ManageProjects'));
const ManageDesigns = lazy(() => import('./ManageDesigns'));
const ManagePhotos = lazy(() => import('./ManagePhotos'));
const ManageCertificates = lazy(() => import('./ManageCertificates'));

const TABS = [
  { key: 'profil', label: 'Profil', icon: User, component: ManageProfil },
  { key: 'perjalanan', label: 'Perjalanan', icon: Map, component: ManageJourneys },
  { key: 'organisasi', label: 'Organisasi', icon: Building2, component: ManageOrganizations },
  { key: 'proyek', label: 'Proyek', icon: Code2, component: ManageProjects },
  { key: 'uiux', label: 'UI/UX', icon: Palette, component: ManageDesigns },
  { key: 'foto', label: 'Foto', icon: Camera, component: ManagePhotos },
  { key: 'sertifikat', label: 'Sertifikat', icon: Award, component: ManageCertificates },
];

function LoadingTab() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
    </div>
  );
}

export default function ManageLayout() {
  const [activeTab, setActiveTab] = useState('profil');

  const ActiveComponent = TABS.find(t => t.key === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <h1 className="text-lg font-semibold">Manage — Portfolio Fajrin</h1>
          </div>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Lihat Website
          </a>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-900/40 border-b border-yellow-700/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <AlertTriangle size={18} className="text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-yellow-300">
            ⚠️ Halaman ini belum diproteksi login — jangan share URL ini ke publik.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-6 bg-gray-900 p-1 rounded-xl border border-gray-800">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 flex-1 sm:flex-none justify-center sm:justify-start ${
                activeTab === key
                  ? 'bg-violet-600 text-white shadow'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <Suspense fallback={<LoadingTab />}>
          {ActiveComponent && <ActiveComponent />}
        </Suspense>
      </div>
    </div>
  );
}
