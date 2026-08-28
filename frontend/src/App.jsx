import { useEffect, useRef, Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ITBackground from './components/ITBackground';
import AdminPIN from './pages/AdminPIN';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Profil = lazy(() => import('./pages/Profil'));
const Perjalanan = lazy(() => import('./pages/Perjalanan'));
const Organisasi = lazy(() => import('./pages/Organisasi'));
const OrganisasiDetail = lazy(() => import('./pages/OrganisasiDetail'));
const Proyek = lazy(() => import('./pages/Proyek'));
const ProyekDetail = lazy(() => import('./pages/ProyekDetail'));
const UiUx = lazy(() => import('./pages/UiUx'));
const UiUxDetail = lazy(() => import('./pages/UiUxDetail'));
const Foto = lazy(() => import('./pages/Foto'));
const Sertifikat = lazy(() => import('./pages/Sertifikat'));
const Kontak = lazy(() => import('./pages/Kontak'));
const ManageLayout = lazy(() => import('./pages/Manage/ManageLayout'));

// PIN-protected route wrapper untuk /manage
function ProtectedManage() {
  const [auth, setAuth] = useState(
    () => sessionStorage.getItem('admin_authenticated') === 'true'
  );
  if (!auth) {
    return <AdminPIN onAuthenticated={() => setAuth(true)} />;
  }
  return (
    <Suspense fallback={<PageLoader />}>
      <ManageLayout />
    </Suspense>
  );
}


// Page loader
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        <p className="text-text-secondary text-sm">Memuat halaman...</p>
      </div>
    </div>
  );
}

// Custom cursor component (desktop only)
function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX - 6}px`;
        cursorRef.current.style.top = `${e.clientY - 6}px`;
      }
    };

    let rafId;
    const animateFollower = () => {
      const dx = posRef.current.x - followerPosRef.current.x;
      const dy = posRef.current.y - followerPosRef.current.y;
      followerPosRef.current.x += dx * 0.12;
      followerPosRef.current.y += dy * 0.12;
      if (followerRef.current) {
        followerRef.current.style.left = `${followerPosRef.current.x - 18}px`;
        followerRef.current.style.top = `${followerPosRef.current.y - 18}px`;
      }
      rafId = requestAnimationFrame(animateFollower);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden lg:block" aria-hidden="true" />
      <div ref={followerRef} className="custom-cursor-follower hidden lg:block" aria-hidden="true" />
    </>
  );
}

// Layout wrapper for pages with Navbar + Footer
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-primary relative">
      {/* IT-themed animated background */}
      <ITBackground />
      {/* Content layer above canvas */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/profil" element={<Layout><Profil /></Layout>} />
          <Route path="/perjalanan" element={<Layout><Perjalanan /></Layout>} />
          <Route path="/organisasi" element={<Layout><Organisasi /></Layout>} />
          <Route path="/organisasi/:identifier" element={<Layout><OrganisasiDetail /></Layout>} />
          <Route path="/proyek" element={<Layout><Proyek /></Layout>} />
          <Route path="/proyek/:slug" element={<Layout><ProyekDetail /></Layout>} />
          <Route path="/uiux" element={<Layout><UiUx /></Layout>} />
          <Route path="/uiux/:slug" element={<Layout><UiUxDetail /></Layout>} />
          <Route path="/foto" element={<Layout><Foto /></Layout>} />
          <Route path="/sertifikat" element={<Layout><Sertifikat /></Layout>} />
          <Route path="/kontak" element={<Layout><Kontak /></Layout>} />
          {/* Manage — PIN protected, no navbar */}
          <Route path="/manage/*" element={<ProtectedManage />} />
          {/* 404 */}
          <Route path="*" element={
            <Layout>
              <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-h1 font-display font-bold gradient-text mb-4">404</h1>
                <p className="text-text-secondary mb-8">Halaman tidak ditemukan.</p>
                <a href="/" className="text-accent hover:underline">← Kembali ke Beranda</a>
              </div>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
