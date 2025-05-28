import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ExternalLink, Database, Microscope, BarChart, FileUp, Info } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function InfoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Informasi</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Pelajari lebih lanjut tentang analisis mutasi DNA dan cara menggunakan platform ini
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl py-12">
            <Tabs defaultValue="documentation" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="documentation">Dokumentasi</TabsTrigger>
                <TabsTrigger value="resources">Sumber Daya</TabsTrigger>
                <TabsTrigger value="about">Tentang Kami</TabsTrigger>
              </TabsList>
              <TabsContent value="documentation" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dokumentasi Platform</CardTitle>
                    <CardDescription>
                      Panduan lengkap tentang cara menggunakan platform analisis mutasi DNA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <FileUp className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-medium">Langkah 1: Unggah File</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Mulai analisis dengan mengunggah file FASTQ (data sekuens mentah) dan FASTA (sekuens
                          referensi). Platform juga menyediakan opsi database default untuk dbSNP dan BED, atau Anda
                          dapat mengunggah file kustom sesuai kebutuhan penelitian.
                        </p>
                        <div className="ml-7 space-y-3">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">File FASTQ (Wajib)</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Data sekuens DNA mentah dari hasil sekuensing dengan informasi kualitas setiap basa.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Format: .fastq, .fq | Ukuran maksimum: 500MB
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">File FASTA (Wajib)</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Sekuens referensi untuk perbandingan dan identifikasi variasi genetik.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Format: .fasta, .fa, .fna | Ukuran maksimum: 500MB
                            </p>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Database Referensi (Opsional)</p>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" checked disabled />
                                <span className="text-sm text-blue-800">
                                  dbSNP Default - Database variasi genetik global
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <input type="checkbox" className="rounded" checked disabled />
                                <span className="text-sm text-blue-800">BED Default - Anotasi region genomik</span>
                              </div>
                              <p className="text-xs text-blue-700 mt-2">
                                Atau unggah file kustom: .vcf, .txt untuk dbSNP | .bed untuk BED
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Microscope className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-medium">Langkah 2: Proses Analisis Otomatis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Setelah file diunggah, sistem akan secara otomatis melakukan serangkaian analisis untuk
                          mengidentifikasi dan menganalisis mutasi DNA. Proses ini mencakup beberapa tahap yang berjalan
                          secara berurutan.
                        </p>
                        <div className="ml-7 space-y-2">
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                1
                              </div>
                              <p className="text-sm font-medium">Alignment Sekuens</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Menyelaraskan sekuens FASTQ dengan referensi FASTA untuk mengidentifikasi posisi yang
                              berbeda.
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                2
                              </div>
                              <p className="text-sm font-medium">Identifikasi Varian</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Mendeteksi mutasi (substitusi, insersi, delesi) berdasarkan hasil alignment.
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                3
                              </div>
                              <p className="text-sm font-medium">Anotasi Varian</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Menambahkan informasi gen, dampak mutasi, dan kaitan dengan penyakit menggunakan database
                              referensi.
                            </p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                                4
                              </div>
                              <p className="text-sm font-medium">Visualisasi Hasil</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Menyiapkan visualisasi dan ringkasan untuk presentasi hasil yang mudah dipahami.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <BarChart className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-medium">Langkah 3: Hasil dan Interpretasi</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-7">
                          Hasil analisis disajikan dalam format yang komprehensif dan mudah dipahami, mencakup tabel
                          detail mutasi, visualisasi distribusi, dan kesimpulan dengan rekomendasi tindak lanjut.
                        </p>
                        <div className="ml-7 space-y-3">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Tabel Mutasi Terdeteksi</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Daftar lengkap mutasi dengan informasi: posisi kromosom, perubahan basa (referensi →
                              mutasi), gen yang terdampak, tingkat dampak (High/Medium/Low), dan penyakit terkait.
                            </p>
                            <div className="mt-2 flex gap-2">
                              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">High Impact</span>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                                Medium Impact
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Low Impact</span>
                            </div>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Ringkasan Statistik</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Visualisasi distribusi dampak mutasi, jumlah total mutasi, mutasi dampak tinggi, dan
                              jumlah gen yang terdampak dalam format yang mudah dipahami.
                            </p>
                          </div>
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-medium text-green-900">Kesimpulan & Rekomendasi</p>
                            <p className="text-sm text-green-800 mt-1">
                              Sistem akan memberikan tingkat risiko (Kritis/Tinggi/Sedang/Rendah) berdasarkan persentase
                              mutasi dampak tinggi, disertai rekomendasi tindak lanjut yang spesifik untuk setiap
                              tingkat risiko.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Tips untuk Hasil Optimal</p>
                            <ul className="text-sm text-blue-800 mt-2 space-y-1">
                              <li>• Pastikan file FASTQ memiliki kualitas yang baik (Phred score ≥ 20)</li>
                              <li>• Gunakan sekuens referensi yang sesuai dengan spesies yang dianalisis</li>
                              <li>• Untuk analisis klinis, selalu konsultasikan hasil dengan ahli genetika</li>
                              <li>• Simpan file asli untuk keperluan validasi atau analisis ulang</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="resources" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sumber Daya Tambahan</CardTitle>
                    <CardDescription>
                      Referensi dan sumber daya untuk memperdalam pemahaman tentang analisis mutasi DNA
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Artikel dan Tutorial</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <BookOpen className="h-4 w-4" />
                              Pengantar Analisis Mutasi DNA
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <BookOpen className="h-4 w-4" />
                              Panduan Lengkap Format File FASTQ dan FASTA
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <BookOpen className="h-4 w-4" />
                              Teknik Alignment Sekuens DNA Modern
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <BookOpen className="h-4 w-4" />
                              Interpretasi Hasil Analisis Mutasi DNA
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Database Referensi</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              dbSNP - Database of Single Nucleotide Polymorphisms
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              ClinVar - Database of Genomic Variation and Phenotype
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              COSMIC - Catalogue of Somatic Mutations in Cancer
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              gnomAD - Genome Aggregation Database
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Alat dan Software Terkait</h3>
                        <ul className="space-y-2">
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              IGV - Integrative Genomics Viewer
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              UCSC Genome Browser
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              Ensembl Genome Browser
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="flex items-center gap-2 text-sm text-primary hover:underline">
                              <ExternalLink className="h-4 w-4" />
                              VarSome - The Human Genomic Variant Search Engine
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="mb-2">Tentang Kami</CardTitle>
                    <CardDescription>
                      Kami merupakan mahasiswa/i dari Jurusan Sistem dan Teknologi Informasi Angkatan 22 Kampus Jatinangor, ITB. Website ini merupakan hasil kerja kami dalam menyelesaikan tugas besar mata kuliah Komputasi Domain Spesifik.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-10">
                      <div className="text-center space-y-4">
                        {/* <h3 className="text-xl font-semibold">Visi & Misi</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="p-6 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Visi</h4>
                            <p className="text-sm text-muted-foreground">
                              Menjadi platform terdepan dalam analisis mutasi DNA yang memungkinkan peneliti di seluruh
                              dunia untuk mengidentifikasi dan memahami variasi genetik dengan mudah dan akurat.
                            </p>
                          </div>
                          <div className="p-6 bg-muted rounded-lg">
                            <h4 className="font-medium mb-2">Misi</h4>
                            <p className="text-sm text-muted-foreground">
                              Menyediakan alat analisis genomik yang canggih namun mudah digunakan untuk mendukung
                              penelitian medis, diagnosis penyakit genetik, dan pengembangan terapi personalisasi.
                            </p>
                          </div>
                        </div> */}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-center mb-8">Kelompok 3</h3>
                        <div className="grid gap-8 md:grid-cols-3">
                          <div className="text-center space-y-4">
                            <div className="mx-auto w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              <img
                                src="/placeholder.svg?height=128&width=128"
                                alt="Dr. Andi Wijaya"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">Lina Azizah R.H.</h4>
                              <p className="text-sm text-primary font-medium">18222107</p>
                              <p className="text-sm text-muted-foreground mt-2 text-justify mx-2">
                                Mengimplementasikan fungsi untuk mencocokkan hasil perbandingan FASTA dan FASTQ dengan database mutasi (dbSNP) dan wilayah gen penting (BED), sehingga mutasi yang terdeteksi dapat dianalisis berdasarkan relevansi biologisnya.
                              </p>
                            </div>
                          </div>

                          <div className="text-center space-y-4">
                            <div className="mx-auto w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              <img
                                src="/placeholder.svg?height=128&width=128"
                                alt="Dr. Siti Rahayu"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">Jason Jahja</h4>
                              <p className="text-sm text-primary font-medium">18222116</p>
                              <p className="text-sm text-muted-foreground mt-2 text-justify mx-2">
                                Membangun antarmuka web dan mengintegrasikan seluruh fungsi analisis ke dalam platform, memungkinkan pengguna mengunggah data genom, menjalankan analisis, serta melihat hasil dan visualisasi mutasi secara interaktif.
                              </p>
                            </div>
                          </div>

                          <div className="text-center space-y-4">
                            <div className="mx-auto w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                              <img
                                src="/placeholder.svg?height=128&width=128"
                                alt="Budi Santoso"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold">Anindita Widya Santoso</h4>
                              <p className="text-sm text-primary font-medium">18222128</p>
                              <p className="text-sm text-muted-foreground mt-2 text-justify mx-2">
                                Merancang algoritma utama untuk membandingkan sekuens referensi FASTA dengan data sampel FASTQ, serta membangun pipeline deteksi mutasi berdasarkan perbedaan sekuens.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="text-center space-y-4">
                        <h3 className="text-xl font-semibold">Kontak Tim</h3>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">team@dnamutation.id</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Telepon</p>
                            <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
                          </div>
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium">Alamat</p>
                            <p className="text-sm text-muted-foreground">Jakarta, Indonesia</p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
