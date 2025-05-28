"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Dna, CheckCircle2, AlertCircle, BarChart, Database, Microscope } from "lucide-react"

export default function AnalysisPage() {
  const [selectedOptions, setSelectedOptions] = useState({
    qualityCheck: true,
    alignment: true,
    mutationIdentification: true,
  })
  const [analysisStatus, setAnalysisStatus] = useState<"idle" | "running" | "completed" | "error">("idle")
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState({
    qualityCheck: 0,
    alignment: 0,
    mutationIdentification: 0,
  })

  const handleOptionChange = (option: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const startAnalysis = () => {
    setAnalysisStatus("running")
    setCurrentStep(0)
    setProgress({
      qualityCheck: 0,
      alignment: 0,
      mutationIdentification: 0,
    })

    // Simulasi analisis
    simulateAnalysisStep("qualityCheck", 0)
  }

  const simulateAnalysisStep = (step: keyof typeof progress, startValue: number) => {
    if (!selectedOptions[step]) {
      if (step === "qualityCheck") {
        simulateAnalysisStep("alignment", 0)
      } else if (step === "alignment") {
        simulateAnalysisStep("mutationIdentification", 0)
      } else {
        setAnalysisStatus("completed")
      }
      return
    }

    setProgress((prev) => ({ ...prev, [step]: startValue }))

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newValue = prev[step] + 2

        if (newValue >= 100) {
          clearInterval(interval)

          // Lanjut ke langkah berikutnya
          if (step === "qualityCheck") {
            setCurrentStep(1)
            simulateAnalysisStep("alignment", 0)
          } else if (step === "alignment") {
            setCurrentStep(2)
            simulateAnalysisStep("mutationIdentification", 0)
          } else {
            setAnalysisStatus("completed")
          }

          return { ...prev, [step]: 100 }
        }

        return { ...prev, [step]: newValue }
      })
    }, 100)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Dna className="h-6 w-6" />
            <span>DNA Mutation Analysis</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground">
              Beranda
            </Link>
            <Link href="/upload" className="text-sm font-medium text-muted-foreground">
              Unggah
            </Link>
            <Link href="/analysis" className="text-sm font-medium">
              Analisis
            </Link>
            <Link href="/results" className="text-sm font-medium text-muted-foreground">
              Hasil
            </Link>
            <Link href="/info" className="text-sm font-medium text-muted-foreground">
              Informasi
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Analisis DNA</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Pilih opsi analisis dan pantau progres analisis mutasi DNA
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Card>
              <CardHeader>
                <CardTitle>Opsi Analisis</CardTitle>
                <CardDescription>Pilih jenis analisis yang ingin dilakukan pada data DNA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 space-y-0">
                    <Checkbox
                      id="quality-check"
                      checked={selectedOptions.qualityCheck}
                      onCheckedChange={() => handleOptionChange("qualityCheck")}
                      disabled={analysisStatus === "running"}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="quality-check"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pengecekan Kualitas
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Memeriksa kualitas data sekuens DNA dari file FASTQ
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-y-0">
                    <Checkbox
                      id="alignment"
                      checked={selectedOptions.alignment}
                      onCheckedChange={() => handleOptionChange("alignment")}
                      disabled={analysisStatus === "running"}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="alignment"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Alignment
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Menyelaraskan sekuens DNA dengan sekuens referensi
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 space-y-0">
                    <Checkbox
                      id="mutation-identification"
                      checked={selectedOptions.mutationIdentification}
                      onCheckedChange={() => handleOptionChange("mutationIdentification")}
                      disabled={analysisStatus === "running"}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="mutation-identification"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Identifikasi Mutasi
                      </label>
                      <p className="text-sm text-muted-foreground">
                        Mengidentifikasi mutasi DNA berdasarkan hasil alignment
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" disabled={analysisStatus === "running"}>
                  Kembali
                </Button>
                <Button
                  onClick={startAnalysis}
                  disabled={analysisStatus === "running" || !Object.values(selectedOptions).some(Boolean)}
                >
                  {analysisStatus === "running" ? "Sedang Berjalan..." : "Mulai Analisis"}
                </Button>
              </CardFooter>
            </Card>

            {analysisStatus !== "idle" && (
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Progres Analisis</CardTitle>
                  <CardDescription>Pantau progres analisis data DNA secara real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedOptions.qualityCheck && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Microscope className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Pengecekan Kualitas</span>
                          </div>
                          <span className="text-sm">{progress.qualityCheck}%</span>
                        </div>
                        <Progress value={progress.qualityCheck} className="h-2" />
                        {progress.qualityCheck === 100 && (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Pengecekan kualitas selesai</span>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedOptions.alignment && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Alignment</span>
                          </div>
                          <span className="text-sm">{progress.alignment}%</span>
                        </div>
                        <Progress value={progress.alignment} className="h-2" />
                        {progress.alignment === 100 && (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Alignment selesai</span>
                          </div>
                        )}
                      </div>
                    )}

                    {selectedOptions.mutationIdentification && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Identifikasi Mutasi</span>
                          </div>
                          <span className="text-sm">{progress.mutationIdentification}%</span>
                        </div>
                        <Progress value={progress.mutationIdentification} className="h-2" />
                        {progress.mutationIdentification === 100 && (
                          <div className="flex items-center gap-2 text-sm text-green-500">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Identifikasi mutasi selesai</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  {analysisStatus === "completed" && (
                    <div className="w-full">
                      <Alert className="border-green-500 text-green-500 mb-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Analisis Selesai</AlertTitle>
                        <AlertDescription>
                          Semua proses analisis telah selesai. Anda dapat melihat hasil analisis sekarang.
                        </AlertDescription>
                      </Alert>
                      <div className="flex justify-center">
                        <Link href="/results">
                          <Button size="lg">Lihat Hasil Analisis</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                  {analysisStatus === "error" && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>Terjadi kesalahan saat melakukan analisis. Silakan coba lagi.</AlertDescription>
                    </Alert>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">© 2025 DNA Mutation Analysis. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
              Kebijakan Privasi
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
              Syarat dan Ketentuan
            </Link>
            <Link href="#" className="text-sm text-muted-foreground underline underline-offset-4">
              Kontak
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
