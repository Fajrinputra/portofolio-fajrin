import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, AtSign, Code2, MessageCircle, Camera, Download, Send } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import api from '../services/api';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'fajrinputrapratama01@gmail.com',
    href: 'mailto:fajrinputrapratama01@gmail.com',
    color: '#EA4335'
  },
  {
    icon: AtSign,
    label: 'LinkedIn',
    value: 'Fajrin Putra Pratama',
    href: 'https://www.linkedin.com/in/fajrin-putra-pratama-174b6a1a6?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    color: '#0A66C2'
  },
  {
    icon: Code2,
    label: 'GitHub',
    value: 'github.com/Fajrinputra',
    href: 'https://github.com/Fajrinputra',
    color: '#A78BFA'
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '082182751322',
    href: 'https://wa.me/6282182751322',
    color: '#25D366'
  },
  {
    icon: Camera,
    label: 'Instagram',
    value: '@jjejebae',
    href: 'https://www.instagram.com/jjejebae?igsi=MXhldmI1YjliaWp0NQ==',
    color: '#E1306C'
  },
];

export default function Kontak() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/messages', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };


  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <SectionHeading
            label="Kontak"
            title="Mari Terhubung"
            subtitle="Saya terbuka untuk peluang kerja, freelance, kolaborasi proyek, atau sekadar ngobrol tentang teknologi dan desain."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            className="glass-card p-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display font-semibold text-text-primary mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                  Nama Lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                  Alamat Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Halo Fajrin, saya ingin..."
                  className="form-input resize-none"
                />
              </div>

              <Button type="submit" size="lg" disabled={status === 'sent' || status === 'sending'}>
                {status === 'sending' ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Mengirim...</>
                ) : status === 'sent' ? (
                  '✓ Pesan Terkirim!'
                ) : status === 'error' ? (
                  '❌ Gagal, coba lagi'
                ) : (
                  <><Send size={16} /> Kirim Pesan</>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-text-primary mb-5">Kontak Langsung</h3>
              <div className="flex flex-col gap-4">
                {contactLinks.map(({ icon: Icon, label, value, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-btn hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-body">{label}</p>
                      <p className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-text-primary mb-3">Curriculum Vitae</h3>
              <p className="text-sm text-text-secondary font-body mb-4">
                Unduh CV saya untuk informasi lengkap pengalaman dan kemampuan.
              </p>
              <Button href="/assets/CV-Fajrin-Putra-Pratama.pdf" variant="outline" size="sm">
                <Download size={15} /> Download CV
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
