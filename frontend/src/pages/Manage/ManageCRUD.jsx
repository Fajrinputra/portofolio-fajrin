/**
 * Generic CRUD Manage Component Factory
 * Digunakan oleh ManageJourneys, ManageOrganizations, ManagePhotos, ManageCertificates
 */
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import FileUpload from '../../components/FileUpload';

const INPUT_CLASS = 'w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-100 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 placeholder-gray-500';
const LABEL_CLASS = 'block text-xs font-medium text-gray-400 mb-1';

// Confirm delete modal
function ConfirmModal({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-sm w-full">
        <h3 className="font-semibold text-white mb-2">Hapus Data</h3>
        <p className="text-sm text-gray-400 mb-6">
          Yakin ingin menghapus <strong className="text-white">"{title}"</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
            Batal
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// Generic form row renderer
function FormField({ field, value, onChange }) {
  const { name, label, type = 'text', rows, placeholder, options } = field;
  const cls = INPUT_CLASS;

  if (type === 'textarea') {
    return (
      <div>
        <label className={LABEL_CLASS}>{label}</label>
        <textarea name={name} value={value || ''} onChange={onChange} rows={rows || 3} placeholder={placeholder} className={`${cls} resize-none`} />
      </div>
    );
  }
  if (type === 'select') {
    return (
      <div>
        <label className={LABEL_CLASS}>{label}</label>
        <select name={name} value={value || ''} onChange={onChange} className={cls}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  // type='upload' — single file upload (image atau document)
  if (type === 'upload') {
    return (
      <FileUpload
        label={label}
        type={field.fileType || 'image'}
        value={value || ''}
        onChange={url => onChange({ target: { name, value: url } })}
        preview={true}
      />
    );
  }
  // type='gallery' — multiple image upload
  if (type === 'gallery') {
    const currentUrls = Array.isArray(value) ? value : (typeof value === 'string' && value ? [value] : []);
    return (
      <div>
        <FileUpload
          label={label}
          type="image"
          multiple={true}
          value={''}
          onMultipleChange={urls => {
            const merged = [...currentUrls, ...urls];
            onChange({ target: { name, value: merged } });
          }}
          preview={false}
        />
        {/* Preview existing gallery */}
        {currentUrls.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentUrls.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg border border-gray-700" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = currentUrls.filter((_, idx) => idx !== i);
                    onChange({ target: { name, value: updated } });
                  }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white flex items-center justify-center text-xs hover:bg-red-600"
                >×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      <label className={LABEL_CLASS}>{label}</label>
      <input type={type} name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className={cls} />
    </div>
  );
}

export function ManageCRUD({ title, titleColLabel, fields, getAll, create, update, remove, getItemTitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = () => {
    setLoading(true);
    getAll().then(setItems).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditItem(null);
    const empty = {};
    fields.forEach(f => { empty[f.name] = ''; });
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    const f = {};
    fields.forEach(field => {
      const v = item[field.name];
      f[field.name] = field.type === 'json'
        ? (Array.isArray(v) ? v.join(', ') : (typeof v === 'string' ? v : JSON.stringify(v || [])))
        : (v || '');
    });
    setForm(f);
    setShowForm(true);
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');
    try {
      const payload = {};
      fields.forEach(f => {
        payload[f.name] = f.type === 'json'
          ? form[f.name].split(',').map(x => x.trim()).filter(Boolean)
          : form[f.name];
      });

      if (editItem) {
        await update(editItem.id, payload);
        setMsg('✅ Data diperbarui.');
      } else {
        await create(payload);
        setMsg('✅ Data ditambahkan.');
      }
      load();
      setShowForm(false);
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await remove(deleteTarget.id);
      load();
    } catch (err) {
      setMsg(`❌ ${err.response?.data?.message || err.message}`);
    }
    setDeleteTarget(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="text-xs text-gray-500 mt-0.5">{items.length} item</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={14} /> Tambah Baru
        </button>
      </div>

      {msg && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${msg.startsWith('✅') ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300'}`}>
          {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-violet-500/30 rounded-xl p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">{editItem ? 'Edit Data' : 'Tambah Data Baru'}</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            {fields.filter(f => f.type !== 'json_raw').map(f => (
              <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                <FormField field={f} value={form[f.name]} onChange={handleChange} />
              </div>
            ))}
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg text-sm transition-colors">
                <Save size={14} /> {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors">
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12"><div className="w-7 h-7 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" /></div>
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500 py-12 text-sm">Belum ada data. Klik "+ Tambah Baru" untuk mulai.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-800 bg-gray-800/50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400 w-12">#</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-400">{titleColLabel || 'Judul / Nama'}</th>
                  {fields.filter(f => f.tableCol).map(f => (
                    <th key={f.name} className="text-left px-4 py-3 text-xs font-medium text-gray-400 hidden md:table-cell">{f.label}</th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-400 w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {items.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 text-gray-200 font-medium max-w-xs truncate">
                      {getItemTitle(item)}
                    </td>
                    {fields.filter(f => f.tableCol).map(f => (
                      <td key={f.name} className="px-4 py-3 text-gray-400 hidden md:table-cell max-w-[150px] truncate">
                        {String(item[f.name] || '-')}
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(item)} className="p-1.5 text-gray-400 hover:text-violet-400 hover:bg-violet-400/10 rounded transition-colors" title="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setDeleteTarget(item)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Hapus">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm Delete Modal */}
      {deleteTarget && (
        <ConfirmModal
          title={getItemTitle(deleteTarget)}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
