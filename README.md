# Mutalyzr

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/shadcn/ui-Latest-000000?style=for-the-badge&logo=shadcnui" alt="shadcn/ui">
</div>

<div align="center">
  <h3>Platform analisis mutasi DNA yang komprehensif dan intuitif untuk peneliti biologi</h3>
  <p>Unggah, analisis, dan visualisasikan data genom dengan mudah menggunakan teknologi web modern</p>
</div>

---

## 🧬 Tentang Proyek

Mutalyzr adalah aplikasi web yang dirancang khusus untuk membantu peneliti biologi dalam menganalisis mutasi DNA. Platform ini menyediakan antarmuka yang user-friendly untuk mengunggah file genom, melakukan analisis otomatis, dan mendapatkan hasil yang komprehensif dengan visualisasi yang mudah dipahami.

### ✨ Fitur Utama

- **📁 Upload File Genom**: Dukungan untuk file FASTQ dan FASTA dengan validasi format
- **🔬 Analisis Otomatis**: Proses alignment, identifikasi varian, dan anotasi secara otomatis
- **📊 Visualisasi Hasil**: Tabel mutasi, grafik distribusi, dan ringkasan statistik
- **🎯 Tingkat Risiko**: Penilaian risiko otomatis dengan rekomendasi tindak lanjut
- **🗃️ Database Terintegrasi**: Dukungan untuk dbSNP, ClinVar, COSMIC, dan gnomAD
- **📱 Responsive Design**: Optimized untuk desktop, tablet, dan mobile

## 🚀 Demo

🔗 **Live Demo**: [DNA Mutation Analysis Platform](https://your-demo-url.com)

### Screenshot

<div align="center">
  <img src="/public/images/homepage-screenshot.png" alt="Homepage" width="800">
  <p><em>Halaman utama dengan fitur overview</em></p>
</div>

<div align="center">
  <img src="/public/images/upload-screenshot.png" alt="Upload Page" width="800">
  <p><em>Halaman upload dengan drag & drop interface</em></p>
</div>

<div align="center">
  <img src="/public/images/results-screenshot.png" alt="Results Page" width="800">
  <p><em>Halaman hasil dengan tabel mutasi dan visualisasi</em></p>
</div>

## 📋 Prerequisites

Pastikan Anda memiliki software berikut terinstall:

- **Node.js** (v18.0.0 atau lebih baru)
- **npm** (v8.0.0 atau lebih baru) atau **yarn**
- **Git**

## ⚡ Quick Start

### 1. Clone Repository

\`\`\`bash
git clone https://github.com/your-username/dna-mutation-analysis.git
cd dna-mutation-analysis
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
# atau
yarn install
\`\`\`

### 3. Setup Environment Variables

Buat file `.env.local` di root directory:

\`\`\`env
# Database Configuration
DATABASE_URL="your-database-url"

# External APIs
DBSNP_API_KEY="your-dbsnp-api-key"
CLINVAR_API_KEY="your-clinvar-api-key"
COSMIC_API_KEY="your-cosmic-api-key"

# File Upload Configuration
MAX_FILE_SIZE=524288000  # 500MB in bytes
UPLOAD_DIR="./uploads"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
# atau
yarn dev
\`\`\`

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Proyek

\`\`\`
dna-mutation-analysis/
├── app/                          # Next.js App Router
│   ├── (pages)/
│   │   ├── page.tsx             # Homepage
│   │   ├── upload/              # Upload page
│   │   ├── analysis/            # Analysis page
│   │   ├── results/             # Results page
│   │   └── info/                # Information page
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── navbar.tsx
│   │   └── ...
│   └── custom/                  # Custom components
├── lib/                         # Utility functions
│   ├── utils.ts
│   ├── analysis/                # DNA analysis algorithms
│   └── database/                # Database connections
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── types/                       # TypeScript type definitions
├── hooks/                       # Custom React hooks
└── config/                      # Configuration files
\`\`\`

## 🔬 Cara Penggunaan

### 1. Upload File Genom

1. Navigasi ke halaman **Upload**
2. Upload file **FASTQ** (data sekuens mentah)
3. Upload file **FASTA** (sekuens referensi)
4. Pilih database referensi:
   - ✅ Gunakan database default (dbSNP & BED)
   - 📁 Upload file kustom (.vcf, .txt, .bed)

### 2. Proses Analisis

Sistem akan otomatis melakukan:
- **Alignment Sekuens**: Menyelaraskan FASTQ dengan referensi FASTA
- **Identifikasi Varian**: Mendeteksi mutasi (substitusi, insersi, delesi)
- **Anotasi Varian**: Menambahkan informasi gen dan dampak
- **Visualisasi**: Menyiapkan grafik dan ringkasan

### 3. Interpretasi Hasil

- **Tabel Mutasi**: Detail posisi, perubahan, gen, dan dampak
- **Tingkat Risiko**: Kritis/Tinggi/Sedang/Rendah berdasarkan analisis
- **Rekomendasi**: Tindak lanjut spesifik untuk setiap tingkat risiko

## 🧪 Format File yang Didukung

### Input Files
| Format | Extension | Deskripsi | Max Size |
|--------|-----------|-----------|----------|
| FASTQ | `.fastq`, `.fq` | Data sekuens DNA mentah dengan quality scores | 500MB |
| FASTA | `.fasta`, `.fa`, `.fna` | Sekuens referensi | 500MB |
| VCF | `.vcf` | Variant Call Format untuk dbSNP kustom | 100MB |
| BED | `.bed` | Browser Extensible Data untuk anotasi region | 50MB |

## 🔧 Development

### Available Scripts

\`\`\`bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Database
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
\`\`\`

## 👥 Tim Pengembang

| Nama | NIM |
|--------|--------|
| Lina Azizah R.H. | 18222107 |
| Jason Jahja | 18222116 |
| Anindita Widya Santoso | 18222128 |

---

<div align="center">
  <p>Made with ❤️ by Kelompok 3</p>
  <p>© 2025 Mutalyzr. All rights reserved.</p>
</div>
