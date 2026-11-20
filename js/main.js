/**
 * ===================================================================
 * WATTWISE - JAVASCRIPT CONTROLLER (FASE 1, 2, & 3)
 * Kampanye Hemat Energi - Proyek ESD (PPLG XI-4)
 * ===================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
  // === 1. FUNGSI TOMBOL HAMBURGER MENU ===
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
    });
  }

  // === 2. GRAFIK CHART.JS (HALAMAN DATA.HTML) ===
  if (typeof DATA_ENERGI !== "undefined") {
    const canvasKategori = document.getElementById("grafikKategori");
    if (canvasKategori) {
      new Chart(canvasKategori, {
        type: "pie",
        data: {
          labels: ["Sangat Baik", "Baik", "Cukup", "Kurang"],
          datasets: [{
            data: [378, 234, 23, 1],
            backgroundColor: ["#10b981", "#34d399", "#fbbf24", "#ef4444"]
          }]
        }
      });
    }

    const canvasJurusan = document.getElementById("grafikJurusan");
    if (canvasJurusan) {
      new Chart(canvasJurusan, {
        type: "bar",
        data: {
          labels: DATA_ENERGI.per_jurusan.map(item => item.kode),
          datasets: [{
            label: "Rata-Rata Skor",
            data: DATA_ENERGI.per_jurusan.map(item => item.rata_rata_skor),
            backgroundColor: "#10b981"
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, max: 4 }
          }
        }
      });
    }
  }

  // === 3. CHECKLIST AKSI HARIAN DENGAN PROGRESS BAR (HALAMAN AKSI.HTML) ===
  const checkboxes = document.querySelectorAll(".aksi-check");
  const statusChecklist = document.getElementById("statusChecklist");
  const progressBarAksi = document.getElementById("progressBarAksi");

  function perbaruiProgressChecklist() {
    if (!checkboxes.length || !statusChecklist) return;

    const total = checkboxes.length;
    const selesai = document.querySelectorAll(".aksi-check:checked").length;
    const persen = Math.round((selesai / total) * 100);

    if (progressBarAksi) {
      progressBarAksi.style.width = persen + "%";
    }

    if (selesai === total) {
      statusChecklist.textContent = `Luar biasa! Semua ${total} aksi hemat energi hari ini selesai (100%)!`;
      statusChecklist.style.background = "#fef3c7";
      statusChecklist.style.color = "#78350f";
    } else {
      statusChecklist.textContent = `Progress hari ini: ${selesai} dari ${total} aksi selesai (${persen}%).`;
      statusChecklist.style.background = "#ecfdf5";
      statusChecklist.style.color = "#047857";
    }

    // Simpan status centang secara ringan di browser
    const statusArray = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem("wattwise_checklist", JSON.stringify(statusArray));
  }

  if (checkboxes.length > 0) {
    // Muat ulang centangan tersimpan jika ada
    const tersimpan = JSON.parse(localStorage.getItem("wattwise_checklist") || "[]");
    checkboxes.forEach((box, index) => {
      if (tersimpan[index]) box.checked = true;
      box.addEventListener("change", perbaruiProgressChecklist);
    });
    perbaruiProgressChecklist();
  }

  // === 4. PENYIMPANAN KOMITMEN RINGAN (MAKSIMAL 15 DATA DI LOCALSTORAGE) ===
  const formKomitmen = document.getElementById("formKomitmen");
  const daftarKomitmen = document.getElementById("daftarKomitmen");
  const STORAGE_KEY = "wattwise_komitmen_list";
  const MAX_KOMITMEN = 15; // Dibatasi 15 data agar penyimpanan sangat ringan (< 3 KB)

  // Data awal bawaan agar tampilan tidak kosong saat pertama kali dibuka
  const dataAwal = [
    { nama: "Bunga - PPLG XI-4", janji: "Selalu mematikan lampu kelas dan mencabut charger sebelum pulang sekolah.", waktu: "Hari ini" },
    { nama: "Carvidya - PPLG XI-4", janji: "Mengaktifkan mode Battery Saver di laptop saat praktik pemrograman.", waktu: "Hari ini" }
  ];

  function muatKomitmen() {
    if (!daftarKomitmen) return;

    let list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!list) {
      list = dataAwal;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    daftarKomitmen.innerHTML = "";
    list.forEach(item => {
      const kartu = document.createElement("div");
      kartu.style.padding = "10px 14px";
      kartu.style.background = "#f8fafc";
      kartu.style.borderLeft = "4px solid #10b981";
      kartu.style.borderRadius = "6px";

      const header = document.createElement("div");
      header.style.display = "flex";
      header.style.justifyContent = "space-between";
      header.style.fontSize = "0.88rem";

      const strongNama = document.createElement("strong");
      strongNama.textContent = item.nama;

      const spanWaktu = document.createElement("span");
      spanWaktu.style.color = "#64748b";
      spanWaktu.style.fontSize = "0.78rem";
      spanWaktu.textContent = item.waktu;

      const pJanji = document.createElement("p");
      pJanji.style.fontSize = "0.9rem";
      pJanji.style.marginTop = "4px";
      pJanji.textContent = `"${item.janji}"`;

      header.appendChild(strongNama);
      header.appendChild(spanWaktu);
      kartu.appendChild(header);
      kartu.appendChild(pJanji);
      daftarKomitmen.appendChild(kartu);
    });
  }

  if (formKomitmen && daftarKomitmen) {
    muatKomitmen();

    formKomitmen.addEventListener("submit", function (e) {
      e.preventDefault();

      const nama = document.getElementById("namaSiswa").value.trim();
      const janji = document.getElementById("isiKomitmen").value.trim();

      if (nama && janji) {
        let list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        const tanggal = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" });

        // Tambahkan komitmen baru di urutan paling atas
        list.unshift({ nama, janji, waktu: tanggal });

        // Potong jika lebih dari 15 agar penyimpanan tetap sangat ringan
        if (list.length > MAX_KOMITMEN) {
          list = list.slice(0, MAX_KOMITMEN);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        muatKomitmen();
        formKomitmen.reset();
      }
    });
  }
});