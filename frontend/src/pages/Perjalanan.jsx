import { useEffect, useState } from 'react';
import { getJourneys } from '../services/api';
import SectionHeading from '../components/SectionHeading';
import Timeline from '../components/Timeline';
import { useLanguage } from '../contexts/LanguageContext';

export default function Perjalanan() {
  const { t, lang } = useLanguage();
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJourneys()
      .then(setJourneys)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-bg-primary section-py">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <SectionHeading
            label={t('journey_label')}
            title={t('journey_title')}
            subtitle={lang === 'en'
              ? 'From elementary school to earning a Bachelor of Information Systems from Andalas University — a long journey that shaped who I am today.'
              : 'Dari bangku SD hingga meraih gelar Sarjana Sistem Informasi dari Universitas Andalas — perjalanan panjang yang membentuk siapa saya hari ini.'
            }
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          </div>
        ) : journeys.length > 0 ? (
          <Timeline items={journeys} />
        ) : (
          <p className="text-text-secondary text-center py-12">
            Belum ada data perjalanan. Tambahkan di <a href="/manage" className="text-accent">/manage</a>
          </p>
        )}
      </div>
    </div>
  );
}
