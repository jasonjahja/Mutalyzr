import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dna, FileText, Upload, Database, BarChart, Users, ArrowRight } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-12 px-6">
                <div className="space-y-8">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Analisis Mutasi DNA Komprehensif
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Platform analisis mutasi DNA yang intuitif untuk peneliti biologi. Unggah, analisis, dan
                    visualisasikan data genom dengan mudah.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/upload">
                    <Button size="lg" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Mulai Analisis
                    </Button>
                  </Link>
                  <Link href="/info">
                    <Button size="lg" variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      Pelajari Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full blur-3xl opacity-20"></div>
                  <div className="relative h-full w-full flex items-center justify-center">
                    <Dna className="h-32 w-32 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fitur Utama</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Platform kami menyediakan alat komprehensif untuk analisis mutasi DNA
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Upload className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Unggah File</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Unggah file FASTQ dan FASTA dengan mudah melalui antarmuka yang intuitif dengan indikator status.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Database className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Analisis Genom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lakukan pengecekan alignment, identifikasi mutasi, dan dampak mutasi dengan alat analisis terintegrasi.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <BarChart className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">Visualisasi Hasil</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Lihat hasil dalam bentuk tabel dan visualisasi grafis yang menunjukkan dampak mutasi pada gen.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center mt-4 space-y-4">
              <div className="relative">
                <Link href={'/upload'}>
                  <Button
                    className={`group relative overflow-hidden px-8 py-6 transition-all text-lg font-medium px-10 py-6 rounded-lg`}
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Mulai Analisis DNA Sekarang
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 transition-opacity group-hover:opacity-100"></span>
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground max-w-md text-center">
                Unggah file genom Anda dan dapatkan hasil analisis mutasi DNA yang komprehensif dalam hitungan menit
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Kelompok 3</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Berikut adalah anggota dari Kelompok 3
                </p>
              </div>
            </div>
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 md:grid-cols-3">
                <div className="text-center space-y-4">
                  <div className="mx-auto w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src="/lina.jpg?height=128&width=128"
                      alt="Lina"
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
                      src="/jason.jpg?height=128&width=128"
                      alt="Jason"
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
                      src="/anin.jpg?height=128&width=128"
                      alt="Anin"
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
        </section>
      </main>
      <Footer />
    </div>
  )
}
