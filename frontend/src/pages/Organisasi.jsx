import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Calendar, Briefcase, Images, ArrowRight } from 'lucide-react';
import { getOrganizations } from '../services/api';
import SectionHeading from '../components/SectionHeading';

export default function Organisasi() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrganizations().then(setOrgs).finally(() => setLoading(false));
  }, []);

  // Selalu gunakan ID numerik agar link tidak bergantung pada slug yang mungkin kotor
  const detailLink = (org) => `/organisasi/${org.id}`;

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <SectionHeading
            label="Pengalaman"
            title="Pengalaman Organisasi"
            subtitle="Keterlibatan aktif dalam berbagai organisasi yang membentuk kemampuan kepemimpinan dan kolaborasi saya."
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : orgs.length === 0 ? (
          <p className="text-text-secondary text-center py-12">
            Belum ada data organisasi. Tambahkan di <a href="/manage" className="text-accent">/manage</a>
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orgs.map((org, i) => {
              const gallery = Array.isArray(org.gallery)
                ? org.gallery
                : (typeof org.gallery === 'string' ? (() => { try { return JSON.parse(org.gallery); } catch { return []; } })() : []);

              return (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={detailLink(org)}
                    className="glass-card p-6 block card-hover h-full group"
                  >
                    {/* Logo or Icon */}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10 border border-accent/20 mb-4">
                      {org.logo_url ? (
                        <img src={org.logo_url} alt={`Logo ${org.org_name}`} className="w-8 h-8 object-contain" />
                      ) : (
                        <Building2 size={22} className="text-accent" />
                      )}
                    </div>

                    <h3 className="font-display font-semibold text-text-primary mb-1 leading-snug group-hover:text-accent transition-colors">
                      {org.org_name}
                    </h3>

                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={13} className="text-accent flex-shrink-0" />
                      <span className="text-sm text-accent font-medium">{org.role}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Calendar size={13} className="text-text-secondary flex-shrink-0" />
                      <span className="text-xs text-text-secondary">{org.period}</span>
                    </div>

                    {org.description && (
                      <p className="text-sm text-text-secondary font-body leading-relaxed line-clamp-3 mb-4">
                        {org.description}
                      </p>
                    )}

                    {/* Footer bawah card */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-color">
                      {gallery.length > 0 ? (
                        <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                          <Images size={12} className="text-accent" />
                          {gallery.length} foto kegiatan
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="flex items-center gap-1 text-xs text-accent font-medium group-hover:gap-2 transition-all">
                        Lihat Detail <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
