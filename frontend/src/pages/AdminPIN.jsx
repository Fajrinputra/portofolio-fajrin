import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';

const CORRECT_PIN = '052025';
const SESSION_KEY = 'admin_authenticated';

/**
 * AdminPIN Gate — tampilkan input PIN sebelum akses /manage
 * PIN tersimpan di sessionStorage (otomatis clear saat browser ditutup)
 */
export default function AdminPIN({ onAuthenticated }) {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  const inputRefs = useRef([]);

  // Cek apakah sudah auth di session ini
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      onAuthenticated();
    }
  }, []);

  // Countdown lockout
  useEffect(() => {
    if (!locked) return;
    if (lockTimer <= 0) { setLocked(false); setAttempts(0); return; }
    const t = setTimeout(() => setLockTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [locked, lockTimer]);

  const handleInput = (idx, value) => {
    if (value && !/^\d$/.test(value)) return; // hanya angka
    const next = [...pin];
    next[idx] = value;
    setPin(next);
    setError('');

    // Auto-focus ke kotak berikutnya
    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }

    // Auto-submit jika semua sudah diisi
    if (value && idx === 5) {
      const fullPin = [...next].join('');
      setTimeout(() => verify(fullPin, next), 100);
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !pin[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === 'Enter') {
      const fullPin = pin.join('');
      if (fullPin.length === 6) verify(fullPin, pin);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setPin(pasted.split(''));
      setTimeout(() => verify(pasted, pasted.split('')), 100);
    }
  };

  const verify = (fullPin, currentPin) => {
    if (locked) return;

    if (fullPin === CORRECT_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      onAuthenticated();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPin(['', '', '', '', '', '']);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      inputRefs.current[0]?.focus();

      if (newAttempts >= 5) {
        setLocked(true);
        setLockTimer(30);
        setError('Terlalu banyak percobaan. Tunggu 30 detik.');
      } else {
        setError(`PIN salah. Sisa percobaan: ${5 - newAttempts}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPin = pin.join('');
    if (fullPin.length === 6) verify(fullPin, pin);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(108,92,231,0.3) 0%, transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="glass-card p-8 text-center">
          {/* Header */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <Logo size={64} />
              <div
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: 'var(--gradient-accent)' }}
              >
                <Shield size={12} className="text-white" />
              </div>
            </div>
          </div>

          <h1 className="font-display font-bold text-xl text-text-primary mb-1">
            Area Admin
          </h1>
          <p className="text-sm text-text-secondary mb-8">
            Masukkan PIN untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PIN inputs */}
            <AnimatePresence>
              <motion.div
                animate={shake ? { x: [-10, 10, -8, 8, -4, 0] } : { x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center gap-3"
              >
                {pin.map((digit, idx) => (
                  <div key={idx} className="relative">
                    <input
                      ref={el => inputRefs.current[idx] = el}
                      type={showPin ? 'text' : 'password'}
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleInput(idx, e.target.value)}
                      onKeyDown={e => handleKeyDown(idx, e)}
                      onPaste={idx === 0 ? handlePaste : undefined}
                      disabled={locked}
                      autoFocus={idx === 0}
                      className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none bg-bg-secondary text-text-primary
                        ${digit
                          ? 'border-accent shadow-[0_0_12px_rgba(108,92,231,0.3)]'
                          : 'border-border-color focus:border-accent/60'
                        }
                        ${locked ? 'opacity-40 cursor-not-allowed' : ''}
                      `}
                      style={{ caretColor: 'transparent' }}
                    />
                    {/* Dot indicator bawah */}
                    {!showPin && digit && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Show/hide PIN toggle */}
            <button
              type="button"
              onClick={() => setShowPin(p => !p)}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors mx-auto"
            >
              {showPin ? <EyeOff size={12} /> : <Eye size={12} />}
              {showPin ? 'Sembunyikan' : 'Tampilkan'} PIN
            </button>

            {/* Error */}
            <AnimatePresence>
              {(error || locked) && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3"
                >
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>
                    {locked
                      ? `Akses dikunci. Coba lagi dalam ${lockTimer} detik.`
                      : error
                    }
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <button
              type="submit"
              disabled={pin.join('').length < 6 || locked}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--gradient-accent)' }}
            >
              <Lock size={14} className="inline mr-2" />
              Masuk ke Admin
            </button>
          </form>

          <p className="text-xs text-text-secondary mt-6 opacity-60">
            Akses ini dilindungi. Hanya untuk pemilik portofolio.
          </p>
        </div>

        <p className="text-center text-xs text-text-secondary opacity-40 mt-4">
          Fajrin Putra Pratama · Portfolio Admin
        </p>
      </motion.div>
    </div>
  );
}
