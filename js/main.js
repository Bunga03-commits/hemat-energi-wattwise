/**
 * ===================================================================
 * WATTWISE - JAVASCRIPT CONTROLLER (FASE 1)
 * Kampanye Hemat Energi - Proyek ESD (Education for Sustainable Development)
 * Rombel: PPLG XI-4
 * Anggota Tim:
 * 1. Bunga Khaerunisa
 * 2. Carvidya Nerlita
 * 3. Yemima Grace Abigail Siagian
 * Mata Pelajaran: KIK & PABP
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------------------------------
  // 1. INTERAKSI MENU NAVIGASI RESPONSIF (MOBILE DRAWER)
  // -----------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navMenu.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Menutup menu mobile saat mengklik di luar area navigasi
    document.addEventListener('click', (event) => {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -----------------------------------------------------------------
  // 2. PLACEHOLDER & KERANGKA LOGIKA UNTUK FASE 2:
  //    AUDIT & VISUALISASI DATA (CHART.JS)
  // -----------------------------------------------------------------
  /*
   * [TODO FASE 2 - INTEGRASI CHART.JS]:
   *
   * A. Impor library Chart.js via CDN atau paket lokal:
   *    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   *
   * B. Penyiapan Dataset Konsumsi Energi Sekolah (kWh per ruang/hari):
   *    const energyData = {
   *      labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
   *      datasets: [
   *        {
   *          label: 'Lab Komputer (kWh)',
   *          data: [42, 38, 45, 39, 30],
   *          borderColor: '#10B981',
   *          backgroundColor: 'rgba(16, 185, 129, 0.2)'
   *        },
   *        {
   *          label: 'Ruang Kelas (kWh)',
   *          data: [28, 26, 29, 27, 20],
   *          borderColor: '#FBBF24',
   *          backgroundColor: 'rgba(251, 191, 36, 0.2)'
   *        }
   *      ]
   *    };
   *
   * C. Inisialisasi Canvas Chart:
   *    function renderEnergyChart() {
   *      const ctx = document.getElementById('energyChartCanvas');
   *      if (!ctx) return;
   *      new Chart(ctx, {
   *        type: 'line',
   *        data: energyData,
   *        options: {
   *          responsive: true,
   *          plugins: {
   *            legend: { position: 'top' },
   *            title: { display: true, text: 'Tren Konsumsi Listrik Mingguan' }
   *          }
   *        }
   *      });
   *    }
   */

  // -----------------------------------------------------------------
  // 3. PLACEHOLDER & KERANGKA LOGIKA UNTUK FASE 3:
  //    KALKULATOR PENGHEMATAN DAYA & AKSI CERDAS
  // -----------------------------------------------------------------
  /*
   * [TODO FASE 3 - INTERAKSI SIMULATOR & AUDIT]:
   *
   * A. Logika Kalkulator Penghematan:
   *    function calculateSavings(hoursReduced, wattage, unitCount) {
   *      const kWhSavedPerDay = (hoursReduced * wattage * unitCount) / 1000;
   *      const tariffPerKWh = 1444.70; // Tarif dasar listrik sekolah (B2/R2)
   *      const rupiahSaved = kWhSavedPerDay * tariffPerKWh * 22; // 22 hari sekolah/bulan
   *      return { kWhSavedPerDay, rupiahSaved };
   *    }
   *
   * B. Form Pendaftaran Komitmen Hemat Energi Siswa
   */

  console.log('WattWise Fase 1 loaded: Siap untuk integrasi data di Fase 2.');
});
