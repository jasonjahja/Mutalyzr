"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink, FileDown, Search, AlertTriangle, Info, CheckCircle } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState<string>("alignment")

  // Data mutasi contoh
  const mutationData = [
    {
      id: 1,
      position: "chr19:45411941",
      reference: "C",
      mutation: "T",
      gene: "APOE",
      impact: "Medium",
      disease: "Alzheimer",
      frequency: "14%",
      riskScore: 0.78,
      pubReference: "PMID:20385794"
    },
    {
      id: 2,
      position: "chr12:40252984",
      reference: "G",
      mutation: "A",
      gene: "LRRK2",
      impact: "High",
      disease: "Parkinson",
      frequency: "0.1%",
      riskScore: 0.61,
      pubReference: "PMID:17017515"
    },
    {
      id: 3,
      position: "chr13:99838451",
      reference: "A",
      mutation: "G",
      gene: "SLITRK1",
      impact: "Low",
      disease: "Tourette Syndrome",
      frequency: "2%",
      riskScore: 0.39,
      pubReference: "PMID:16288218"
    }
  ];  


  useEffect(() => {
    // Cek apakah analisis sudah dimulai dari halaman upload
    const analysisStarted = sessionStorage.getItem("analysisStarted") === "true"

    if (analysisStarted) {
      // Simulasi proses analisis
      const steps = ["alignment", "variant_calling", "annotation", "visualization"]
      let currentStepIndex = 0

      const interval = setInterval(() => {
        setAnalysisProgress((prev) => {
          const newProgress = prev + 1

          // Update langkah analisis saat mencapai persentase tertentu
          if (newProgress === 25) {
            setCurrentStep(steps[1])
            currentStepIndex = 1
          } else if (newProgress === 50) {
            setCurrentStep(steps[2])
            currentStepIndex = 2
          } else if (newProgress === 75) {
            setCurrentStep(steps[3])
            currentStepIndex = 3
          }

          // Selesai analisis
          if (newProgress >= 100) {
            clearInterval(interval)
            setAnalysisComplete(true)
            sessionStorage.removeItem("analysisStarted")
            return 100
          }

          return newProgress
        })
      }, 100)

      return () => clearInterval(interval)
    } else {
      // Jika halaman diakses langsung tanpa melalui proses upload
      setAnalysisComplete(true)
      setAnalysisProgress(100)
    }
  }, [])

  // Filter data berdasarkan pencarian
  const filteredData = mutationData.filter(
    (mutation) =>
      mutation.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mutation.gene.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mutation.disease.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fungsi untuk menentukan warna badge berdasarkan impact
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "destructive"
      case "Medium":
        return "warning"
      case "Low":
        return "secondary"
      default:
        return "default"
    }
  }

  // Fungsi untuk mendapatkan label langkah analisis
  const getStepLabel = (step: string) => {
    switch (step) {
      case "alignment":
        return "Alignment Sekuens"
      case "variant_calling":
        return "Identifikasi Varian"
      case "annotation":
        return "Anotasi Varian"
      case "visualization":
        return "Visualisasi Hasil"
      default:
        return "Memproses..."
    }
  }

  // Hitung distribusi mutasi
  const highImpactCount = mutationData.filter((m) => m.impact === "High").length
  const mediumImpactCount = mutationData.filter((m) => m.impact === "Medium").length
  const lowImpactCount = mutationData.filter((m) => m.impact === "Low").length
  const totalMutations = mutationData.length

  const highImpactPercentage = (highImpactCount / totalMutations) * 100
  const mediumImpactPercentage = (mediumImpactCount / totalMutations) * 100
  const lowImpactPercentage = (lowImpactCount / totalMutations) * 100

  // Tentukan tingkat risiko berdasarkan distribusi
  const getRiskLevel = () => {
    if (highImpactPercentage >= 40) return "critical"
    if (highImpactPercentage >= 20) return "high"
    if (highImpactPercentage >= 10) return "medium"
    return "low"
  }

  const riskLevel = getRiskLevel()

  // Fungsi untuk mendapatkan kesimpulan dan rekomendasi
  const getConclusionAndRecommendations = () => {
    const riskLevel = getRiskLevel()

    switch (riskLevel) {
      case "critical":
        return {
          conclusion: `Analisis menunjukkan tingkat risiko KRITIS dengan ${highImpactPercentage.toFixed(1)}% mutasi berdampak tinggi. Ini menunjukkan adanya potensi risiko kesehatan yang sangat serius yang memerlukan perhatian medis segera.`,
          recommendations: [
            "Segera konsultasi dengan dokter spesialis genetika atau onkologi",
            "Pertimbangkan untuk melakukan tes genetik konfirmasi",
            "Diskusikan opsi pencegahan dan deteksi dini dengan tim medis",
            "Pertimbangkan konseling genetik untuk keluarga",
            "Lakukan pemeriksaan kesehatan rutin yang lebih intensif",
          ],
          alertType: "destructive" as const,
          icon: AlertTriangle,
          titleColor: "text-red-900 dark:text-red-500",
          bgColor: "bg-red-100 dark:bg-red-950/30"
        }
      case "high":
        return {
          conclusion: `Analisis menunjukkan tingkat risiko TINGGI dengan ${highImpactPercentage.toFixed(1)}% mutasi berdampak tinggi. Diperlukan tindak lanjut medis untuk evaluasi lebih lanjut.`,
          recommendations: [
            "Konsultasi dengan dokter spesialis untuk evaluasi lebih lanjut",
            "Pertimbangkan tes genetik tambahan untuk konfirmasi",
            "Diskusikan strategi pencegahan yang sesuai",
            "Lakukan pemeriksaan kesehatan berkala",
            "Pertimbangkan konseling genetik",
          ],
          alertType: "destructive" as const,
          icon: AlertTriangle,
          titleColor: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20"
        }
      case "medium":
        return {
          conclusion: `Analisis menunjukkan tingkat risiko SEDANG dengan ${highImpactPercentage.toFixed(1)}% mutasi berdampak tinggi. Diperlukan monitoring dan tindak lanjut yang tepat.`,
          recommendations: [
            "Konsultasi dengan dokter untuk diskusi hasil",
            "Pertimbangkan pemeriksaan kesehatan rutin",
            "Diskusikan gaya hidup sehat untuk pencegahan",
            "Monitor perkembangan dengan pemeriksaan berkala",
            "Pertimbangkan konseling genetik jika diperlukan",
          ],
          alertType: "default" as const,
          icon: Info,
          titleColor: "text-yellow-700 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/10"
        }
      case "low":
        return {
          conclusion: `Analisis menunjukkan tingkat risiko RENDAH dengan ${highImpactPercentage.toFixed(1)}% mutasi berdampak tinggi. Hasil ini menunjukkan profil genetik yang relatif baik.`,
          recommendations: [
            "Lanjutkan gaya hidup sehat untuk pencegahan",
            "Lakukan pemeriksaan kesehatan rutin sesuai usia",
            "Diskusikan hasil dengan dokter jika ada kekhawatiran",
            "Pertahankan pola hidup sehat dan olahraga teratur",
            "Monitor kesehatan secara berkala",
          ],
          alertType: "default" as const,
          icon: CheckCircle,
          titleColor: "text-green-700 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/10"
        }
    }
  }

  const { conclusion, recommendations, alertType, icon: IconComponent, titleColor, bgColor } = getConclusionAndRecommendations()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 md:px-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </div>
                <span className="font-medium mt-2">Unggah</span>
              </div>
              <div className="relative bottom-4 h-2 w-24 bg-primary rounded-full overflow-hidden" />
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  2
                </div>
                <span className="font-medium mt-2">Hasil</span>
              </div>
            </div>
          </div>

          {/* Analysis Progress */}
          {!analysisComplete && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Analisis Sedang Berjalan</CardTitle>
                <CardDescription>Langkah saat ini: {getStepLabel(currentStep)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progres analisis...</span>
                    <span>{analysisProgress}%</span>
                  </div>
                  <Progress value={analysisProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hasil Analisis</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Lihat hasil analisis mutasi DNA dan visualisasi posisi mutasi
              </p>
            </div>
          </div>

          {analysisComplete ? (
            <div className="mx-auto max-w-6xl py-12">
              <Tabs defaultValue="mutations" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mutations">Tabel Mutasi</TabsTrigger>
                  <TabsTrigger value="summary">Ringkasan</TabsTrigger>
                </TabsList>
                <TabsContent value="mutations" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tabel Mutasi Terdeteksi</CardTitle>
                      <CardDescription>Daftar mutasi yang terdeteksi dari analisis sekuens DNA</CardDescription>
                      <div className="relative mt-4">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Cari berdasarkan posisi, gen, atau penyakit..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Posisi</TableHead>
                              <TableHead>Referensi</TableHead>
                              <TableHead>Mutasi</TableHead>
                              <TableHead>Gen</TableHead>
                              <TableHead>Dampak</TableHead>
                              <TableHead>Probabilitas</TableHead>
                              <TableHead>Penyakit Terkait</TableHead>
                              <TableHead>Referensi</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredData.map((mutation) => (
                              <TableRow key={mutation.id}>
                                <TableCell className="font-mono">{mutation.position}</TableCell>
                                <TableCell className="font-mono font-bold">{mutation.pubReference}</TableCell>
                                <TableCell className="font-mono font-bold text-primary">{mutation.mutation}</TableCell>
                                <TableCell>{mutation.gene}</TableCell>
                                <TableCell>
                                  <Badge variant={getImpactColor(mutation.impact) as any}>{mutation.impact}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={mutation.riskScore >= 0.7 ? "destructive" : mutation.riskScore >= 0.4 ? "default" : "secondary"}>
                                    {(mutation.riskScore * 100).toFixed(1)}%
                                  </Badge>
                                </TableCell>
                                <TableCell>{mutation.disease}</TableCell>
                                <TableCell>
                                  <a 
                                    href={`https://pubmed.ncbi.nlm.nih.gov/${mutation.pubReference.replace('PMID:', '')}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-primary hover:underline"
                                  >
                                    {mutation.pubReference}
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Menampilkan {filteredData.length} dari {mutationData.length} mutasi
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="summary" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ringkasan Analisis</CardTitle>
                      <CardDescription>Ringkasan hasil analisis mutasi DNA</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Total Mutasi</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{mutationData.length}</div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Total mutasi yang terdeteksi dari analisis
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Mutasi Dampak Tinggi</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold text-red-500">
                              {mutationData.filter((m) => m.impact === "High").length}
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">
                              Mutasi dengan dampak tinggi pada fungsi protein
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Gen Terdampak</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-3xl font-bold">{new Set(mutationData.map((m) => m.gene)).size}</div>
                            <p className="text-sm text-muted-foreground mt-2">Jumlah gen yang terdampak oleh mutasi</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-medium mb-4">Distribusi Dampak Mutasi</h3>
                        <div className="h-8 w-full rounded-lg overflow-hidden flex">
                          <div
                            className="bg-red-500 h-full"
                            style={{
                              width: `${highImpactPercentage}%`,
                            }}
                          ></div>
                          <div
                            className="bg-yellow-500 h-full"
                            style={{
                              width: `${mediumImpactPercentage}%`,
                            }}
                          ></div>
                          <div
                            className="bg-blue-500 h-full"
                            style={{
                              width: `${lowImpactPercentage}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                          <div>Dampak Tinggi ({highImpactPercentage.toFixed(1)}%)</div>
                          <div>Dampak Sedang ({mediumImpactPercentage.toFixed(1)}%)</div>
                          <div>Dampak Rendah ({lowImpactPercentage.toFixed(1)}%)</div>
                        </div>
                      </div>

                      {/* Kesimpulan dan Rekomendasi */}
                      <div className="mt-8 space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Kesimpulan Analisis</h3>
                          <Alert variant={alertType} className={bgColor}>
                            <IconComponent className="h-4 w-4" />
                            <AlertTitle className={titleColor}>Tingkat Risiko: {riskLevel.toUpperCase()}</AlertTitle>
                            <AlertDescription className="mt-2">{conclusion}</AlertDescription>
                          </Alert>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">Rekomendasi Tindak Lanjut</h3>
                          <Card>
                            <CardContent className="pt-6">
                              <ul className="space-y-3">
                                {recommendations.map((recommendation, index) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                                    </div>
                                    <span className="text-sm">{recommendation}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4">Catatan Penting</h3>
                          <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>Disclaimer</AlertTitle>
                            <AlertDescription>
                              Hasil analisis ini bersifat informatif dan tidak menggantikan konsultasi medis
                              profesional. Selalu konsultasikan dengan dokter atau ahli genetika untuk interpretasi yang
                              akurat dan rencana tindak lanjut yang tepat.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <p className="text-lg text-muted-foreground">Sedang memproses data, mohon tunggu...</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
