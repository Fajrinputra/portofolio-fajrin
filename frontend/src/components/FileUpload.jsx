import { useState, useRef } from 'react';
import { Upload, X, FileText, Image, Check, Loader } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * FileUpload — komponen upload drag & drop
 * Props:
 *  - value: URL saat ini (string)
 *  - onChange: callback(url) setelah upload berhasil
 *  - type: 'image' | 'document' (default: 'image')
 *  - accept: string mime types (opsional)
 *  - label: label text
 *  - multiple: true untuk upload banyak sekaligus (galeri)
 *  - onMultipleChange: callback(urls[]) untuk multiple mode
 *  - preview: true untuk tampilkan preview gambar
 */
export default function FileUpload({
  value = '',
  onChange,
  type = 'image',
  label = 'Upload File',
  multiple = false,
  onMultipleChange,
  preview = true,
  className = '',
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  const acceptMap = {
    image: 'image/jpeg,image/png,image/webp,image/gif',
    document: 'application/pdf',
  };
  const accept = acceptMap[type] || acceptMap.image;

  const doUpload = async (files) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      if (multiple && files.length > 1) {
        const formData = new FormData();
        Array.from(files).forEach(f => formData.append('files', f));
        const res = await fetch(`${API_BASE}/api/upload/multiple`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload gagal');
        const urls = data.files.map(f => `${API_BASE}${f.url}`);
        onMultipleChange?.(urls);
      } else {
        const formData = new FormData();
        formData.append('file', files[0]);
        const res = await fetch(`${API_BASE}/api/upload?type=${type}`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload gagal');
        onChange?.(`${API_BASE}${data.url}`);
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError(e.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    doUpload(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    doUpload(e.target.files);
    e.target.value = '';
  };

  const clearValue = () => {
    onChange?.('');
    setError('');
  };

  const isImage = type === 'image';
  const showPreviewImg = preview && isImage && value && value.startsWith('http');

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
      )}

      {/* Current value preview */}
      {showPreviewImg && (
        <div className="relative inline-block mb-2">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-24 object-cover rounded-lg border border-border-color"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <button
            type="button"
            onClick={clearValue}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
          >
            <X size={10} />
          </button>
        </div>
      )}
      {!isImage && value && (
        <div className="flex items-center gap-2 text-sm text-accent mb-2">
          <FileText size={14} />
          <span className="truncate max-w-xs">{value.split('/').pop()}</span>
          <button type="button" onClick={clearValue} className="text-red-400 hover:text-red-500">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all duration-200 ${
          dragging
            ? 'border-accent bg-accent/10'
            : 'border-border-color hover:border-accent/50 hover:bg-accent/5'
        }`}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleChange}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-accent">
            <Loader size={24} className="animate-spin" />
            <span className="text-sm">Mengupload...</span>
          </div>
        ) : success ? (
          <div className="flex flex-col items-center gap-2 text-green-400">
            <Check size={24} />
            <span className="text-sm font-medium">Upload berhasil!</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-secondary">
            {isImage ? <Image size={24} className="opacity-50" /> : <FileText size={24} className="opacity-50" />}
            <div>
              <span className="text-sm font-medium text-accent">Klik untuk pilih</span>
              <span className="text-sm"> atau drag & drop</span>
            </div>
            <span className="text-xs opacity-60">
              {isImage ? 'JPG, PNG, WebP, GIF' : 'PDF'} — maks. 20MB
              {multiple && ' (bisa pilih banyak sekaligus)'}
            </span>
          </div>
        )}
      </div>

      {/* Manual URL input sebagai alternatif */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-text-secondary">atau masukkan URL manual:</span>
      </div>
      <input
        type="url"
        value={value}
        onChange={e => onChange?.(e.target.value)}
        placeholder={isImage ? 'https://...' : 'https://.../file.pdf'}
        className="form-input text-sm"
      />

      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <X size={10} /> {error}
        </p>
      )}
    </div>
  );
}
