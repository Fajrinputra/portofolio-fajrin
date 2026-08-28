import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/api';
import { Save, Plus, Trash2 } from 'lucide-react';
import FileUpload from '../../components/FileUpload';

const INPUT_CLASS = 'w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 placeholder-gray-500';
const LABEL_CLASS = 'block text-xs font-medium text-gray-400 mb-1';

export default function ManageProfil() {
  const [form, setForm] = useState({
    full_name: '', nickname: '', birth_place: '', birth_date: '',
    tagline: '', bio: '', goals: '', photo_url: '', cv_url: '', skills: [],
    personal_photos: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getProfile().then(data => {
      if (data) {
        setForm({
          ...data,
          birth_date: data.birth_date || '',
          goals: typeof data.goals === 'string' ? data.goals : JSON.stringify(data.goals || [], null, 2),
          skills: Array.isArray(data.skills) ? data.skills : [],
          personal_photos: Array.isArray(data.personal_photos) ? data.personal_photos : [],
        });
      }
    }).finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const addSkillCategory = () => setForm(p => ({ ...p, skills: [...p.skills, { category: '', items: [] }] }));
  const removeSkillCategory = (i) => setForm(p => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }));
  const updateSkillCat = (i, val) => setForm(p => {
    const s = [...p.skills]; s[i] = { ...s[i], category: val }; return { ...p, skills: s };
  });
  const updateSkillItems = (i, val) => setForm(p => {
    const s = [...p.skills]; s[i] = { ...s[i], items: val.split(',').map(x => x.trim()).filter(Boolean) }; return { ...p, skills: s };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      // goals HARUS string untuk kolom TEXT di database
      // Pastikan valid JSON string, jika bukan JSON parse error → kirim apa adanya
      let goalsStr = form.goals;
      if (typeof goalsStr !== 'string') {
        goalsStr = JSON.stringify(goalsStr);
      }
      // Validasi: coba parse untuk memastikan formatnya benar
      try {
        JSON.parse(goalsStr);
      } catch {
        // Jika tidak valid JSON, bungkus sebagai array kosong
        goalsStr = '[]';
        setMsg('⚠️ Format Goals tidak valid, dikosongkan. Gunakan format JSON array.');
      }

      await updateProfile({ ...form, goals: goalsStr });
      setMsg('✅ Profil berhasil disimpan!');
    } catch (err) {
      setMsg(`❌ Error: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" /></div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-base font-semibold mb-5">Data Diri</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: 'full_name', label: 'Nama Lengkap' },
            { name: 'nickname', label: 'Nama Panggilan' },
            { name: 'birth_place', label: 'Tempat Lahir' },
            { name: 'birth_date', label: 'Tanggal Lahir', type: 'date' },
          ].map(({ name, label, type = 'text' }) => (
            <div key={name}>
              <label className={LABEL_CLASS}>{label}</label>
              <input type={type} name={name} value={form[name] || ''} onChange={handleChange} className={INPUT_CLASS} />
            </div>
          ))}
          {/* Foto Profil — FileUpload */}
          <div>
            <FileUpload
              label="Foto Profil"
              type="image"
              value={form.photo_url || ''}
              onChange={url => setForm(p => ({ ...p, photo_url: url }))}
              preview={true}
            />
          </div>
          {/* CV — FileUpload dokumen */}
          <div>
            <FileUpload
              label="File CV (PDF)"
              type="document"
              value={form.cv_url || ''}
              onChange={url => setForm(p => ({ ...p, cv_url: url }))}
              preview={false}
            />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Tagline</label>
            <input name="tagline" value={form.tagline || ''} onChange={handleChange} className={INPUT_CLASS} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Bio (paragraf)</label>
            <textarea name="bio" value={form.bio || ''} onChange={handleChange} rows={5} className={INPUT_CLASS + ' resize-none'} />
          </div>
          <div className="sm:col-span-2">
            <label className={LABEL_CLASS}>Goals (JSON array format)</label>
            <textarea name="goals" value={typeof form.goals === 'string' ? form.goals : JSON.stringify(form.goals, null, 2)} onChange={handleChange} rows={6} className={INPUT_CLASS + ' resize-none font-mono text-xs'} />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold">Skills per Kategori</h2>
          <button type="button" onClick={addSkillCategory} className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm transition-colors">
            <Plus size={14} /> Tambah Kategori
          </button>
        </div>
        <div className="space-y-4">
          {form.skills.map((cat, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 flex gap-3 items-start">
              <div className="flex-1 grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={LABEL_CLASS}>Nama Kategori</label>
                  <input value={cat.category} onChange={e => updateSkillCat(i, e.target.value)} className={INPUT_CLASS} placeholder="Programming & Framework" />
                </div>
                <div>
                  <label className={LABEL_CLASS}>Items (pisah koma)</label>
                  <input value={cat.items?.join(', ') || ''} onChange={e => updateSkillItems(i, e.target.value)} className={INPUT_CLASS} placeholder="PHP, Laravel, React.js" />
                </div>
              </div>
              <button type="button" onClick={() => removeSkillCategory(i)} className="mt-5 text-red-400 hover:text-red-300 transition-colors flex-shrink-0">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Foto Pribadi — Galeri untuk Halaman Profil */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="mb-5">
          <h2 className="text-base font-semibold">Foto Pribadi</h2>
          <p className="text-xs text-gray-500 mt-1">Foto-foto ini akan tampil di halaman Profil sebagai galeri tambahan.</p>
        </div>
        {/* Upload banyak foto sekaligus */}
        <FileUpload
          label="Upload Foto (bisa pilih banyak sekaligus)"
          type="image"
          multiple={true}
          value=""
          onMultipleChange={urls => setForm(p => ({
            ...p,
            personal_photos: [...(p.personal_photos || []), ...urls]
          }))}
          preview={false}
        />
        {/* Grid preview foto yang sudah diupload */}
        {form.personal_photos && form.personal_photos.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
            {form.personal_photos.map((url, i) => (
              <div key={i} className="relative aspect-square">
                <img
                  src={url}
                  alt={`Foto pribadi ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg border border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setForm(p => ({
                    ...p,
                    personal_photos: p.personal_photos.filter((_, idx) => idx !== i)
                  }))}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full text-white flex items-center justify-center text-xs transition-colors"
                >×</button>
              </div>
            ))}
          </div>
        )}
        {(!form.personal_photos || form.personal_photos.length === 0) && (
          <p className="text-xs text-gray-600 mt-3 text-center py-4">Belum ada foto. Upload di atas.</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
          <Save size={15} /> {saving ? 'Menyimpan...' : 'Simpan Profil'}
        </button>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </form>
  );
}
