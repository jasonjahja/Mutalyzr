"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, AlertCircle, CheckCircle2, FileUp, Database, Microscope } from "lucide-react"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function UploadPage() {
  const router = useRouter()
  const [fastqFile, setFastqFile] = useState<File | null>(null)
  const [fastaFile, setFastaFile] = useState<File | null>(null)
  const [dbsnpFile, setDbsnpFile] = useState<File | null>(null)
  const [bedFile, setBedFile] = useState<File | null>(null)

  const [useDefaultDbSNP, setUseDefaultDbSNP] = useState(true)
  const [useDefaultBED, setUseDefaultBED] = useState(true)

  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [qualityCheckStatus, setQualityCheckStatus] = useState<"idle" | "checking" | "passed" | "failed">("idle")
  const [qualityError, setQualityError] = useState<string>("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      switch (fileType) {
        case "fastq":
          setFastqFile(file)
          setQualityCheckStatus("idle") // Reset quality check
          setQualityError("")
          break
        case "fasta":
          setFastaFile(file)
          break
        case "dbsnp":
          setDbsnpFile(file)
          break
        case "bed":
          setBedFile(file)
          break
      }
      setUploadStatus("idle")
    }
  }

  const removeFile = (fileType: string) => {
    switch (fileType) {
      case "fastq":
        setFastqFile(null)
        setQualityCheckStatus("idle")
        setQualityError("")
        break
      case "fasta":
        setFastaFile(null)
        break
      case "dbsnp":
        setDbsnpFile(null)
        break
      case "bed":
        setBedFile(null)
        break
    }
  }

  const simulateUpload = () => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          startAnalysis()
          return 100
        }
        return prev + 3
      })
    }, 150)
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)

    // Simpan informasi file dan status analisis ke sessionStorage
    sessionStorage.setItem("analysisStarted", "true")
    sessionStorage.setItem("analysisProgress", "0")

    // Redirect ke halaman hasil setelah sedikit delay
    setTimeout(() => {
      router.push("/results")
    }, 1000)
  }

  const checkFileQuality = (file: File) => {
    if (!file) return

    setQualityCheckStatus("checking")
    setQualityError("")

    // Simulasi pengecekan kualitas file
    setTimeout(() => {
      // Simulasi berbagai kondisi error berdasarkan nama file atau ukuran
      const fileName = file.name.toLowerCase()
      const fileSize = file.size

      // Simulasi kondisi error
      if (fileSize < 1000) {
        setQualityCheckStatus("failed")
        setQualityError("File terlalu kecil. Ukuran minimum 1KB untuk analisis yang valid.")
      } else if (fileSize > 500 * 1024 * 1024) {
        setQualityCheckStatus("failed")
        setQualityError("File terlalu besar. Ukuran maksimum 500MB.")
      } else if (fileName.includes("low") || fileName.includes("bad")) {
        setQualityCheckStatus("failed")
        setQualityError("Kualitas sekuens rendah. Phred score rata-rata < 20. Gunakan file dengan kualitas lebih baik.")
      } else if (!fileName.includes(".fastq") && !fileName.includes(".fq")) {
        setQualityCheckStatus("failed")
        setQualityError("Format file tidak valid. Pastikan file berformat FASTQ (.fastq atau .fq).")
      } else {
        // File passed quality check
        setQualityCheckStatus("passed")
      }
    }, 2000)
  }

  const canStartAnalysis = () => {
    const hasRequiredFiles = fastqFile && fastaFile
    const hasDbSNP = useDefaultDbSNP || dbsnpFile
    const hasBED = useDefaultBED || bedFile
    const qualityOk = qualityCheckStatus === "passed" || qualityCheckStatus === "idle"
    return hasRequiredFiles && hasDbSNP && hasBED && uploadStatus !== "uploading" && !isAnalyzing && qualityOk
  }

  const FileUploadArea = ({
    file,
    fileType,
    title,
    description,
    acceptedFormats,
  }: {
    file: File | null
    fileType: string
    title: string
    description: string
    acceptedFormats: string
  }) => (
    <div className="flex h-48 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/20 p-4 transition-colors hover:border-muted-foreground/50">
      {file ? (
        <div className="flex flex-col items-center gap-3 text-center">
          <FileText className="h-12 w-12 text-primary" />
          <div>
            <p className="font-medium text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => removeFile(fileType)}>
            Ganti File
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center gap-3 cursor-pointer text-center w-full h-full justify-center">
          <FileUp className="h-12 w-12 text-muted-foreground" />
          <div>
            <span className="font-medium text-sm">Klik untuk memilih {title}</span>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            <p className="text-xs text-muted-foreground mt-1">Format: {acceptedFormats}</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept={acceptedFormats}
            onChange={(e) => handleFileUpload(e, fileType)}
          />
        </label>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </div>
                <span className="font-medium mt-2">Unggah</span>
              </div>
              <div className="relative bottom-4 h-2 w-24 bg-muted rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-300 w-1/2" />
              </div>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold">
                  2
                </div>
                <span className="font-medium text-muted-foreground mt-2">Hasil</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Unggah Data DNA</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Unggah file FASTQ dan FASTA Anda untuk memulai proses analisis dan deteksi mutasi genetik.
              </p>
            </div>
          </div>

          <div className="space-y-8 py-12">
            {/* File Upload Section */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Unggah File FASTQ
                  </CardTitle>
                  <CardDescription>File FASTQ berisi data sekuens DNA mentah dari hasil sekuensing</CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    file={fastqFile}
                    fileType="fastq"
                    title="file FASTQ"
                    description="atau seret dan lepas file di sini"
                    acceptedFormats=".fastq,.fq"
                  />
                </CardContent>
                <CardFooter className="flex justify-between items-start">
                  <div className="flex-1">
                    {qualityError && (
                      <Alert variant="destructive" className="mb-0">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Kualitas File Tidak Memenuhi Syarat</AlertTitle>
                        <AlertDescription className="text-sm">{qualityError}</AlertDescription>
                      </Alert>
                    )}
                    {qualityCheckStatus === "passed" && (
                      <Alert className="border-green-500 text-green-500 mb-0">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Kualitas File Baik</AlertTitle>
                        <AlertDescription className="text-sm">
                          File FASTQ memenuhi standar kualitas untuk analisis (Phred score ≥ 20).
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (fastqFile) checkFileQuality(fastqFile);
                      }}
                      disabled={!fastqFile || qualityCheckStatus === "checking"}
                      className="gap-2"
                    >
                      {qualityCheckStatus === "checking" ? (
                        <>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Memeriksa...
                        </>
                      ) : (
                        <>
                          <Microscope className="h-4 w-4" />
                          Cek Kualitas
                        </>
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Unggah File FASTA
                  </CardTitle>
                  <CardDescription>
                    File FASTA berisi data sekuens referensi untuk analisis perbandingan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    file={fastaFile}
                    fileType="fasta"
                    title="file FASTA"
                    description="atau seret dan lepas file di sini"
                    acceptedFormats=".fasta,.fa,.fna"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Database Options */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Opsi Database Referensi
                  </CardTitle>
                  <CardDescription>Pilih untuk menggunakan database default atau unggah file kustom</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* dbSNP Option */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="use-default-dbsnp"
                        checked={useDefaultDbSNP}
                        onCheckedChange={(checked) => {
                          setUseDefaultDbSNP(checked as boolean)
                          if (checked) setDbsnpFile(null)
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="use-default-dbsnp"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Gunakan database dbSNP default?
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Menggunakan database dbSNP default untuk referensi variasi genetik
                        </p>
                      </div>
                    </div>

                    {!useDefaultDbSNP && (
                      <Card className="ml-6">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Unggah File dbSNP Kustom</CardTitle>
                          <CardDescription className="text-sm">
                            Unggah file dbSNP kustom dalam format VCF atau TXT
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FileUploadArea
                            file={dbsnpFile}
                            fileType="dbsnp"
                            title="file dbSNP"
                            description="Format VCF atau TXT"
                            acceptedFormats=".vcf,.txt"
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* BED Option */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="use-default-bed"
                        checked={useDefaultBED}
                        onCheckedChange={(checked) => {
                          setUseDefaultBED(checked as boolean)
                          if (checked) setBedFile(null)
                        }}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="use-default-bed"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Gunakan file BED default?
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Menggunakan file BED default untuk anotasi region genomik
                        </p>
                      </div>
                    </div>

                    {!useDefaultBED && (
                      <Card className="ml-6">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Unggah File BED Kustom</CardTitle>
                          <CardDescription className="text-sm">
                            Unggah file BED kustom untuk anotasi region genomik
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <FileUploadArea
                            file={bedFile}
                            fileType="bed"
                            title="file BED"
                            description="Format BED standar"
                            acceptedFormats=".bed"
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upload Progress */}
            {uploadStatus === "uploading" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Mengunggah file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Status Alerts */}
            {uploadStatus === "success" && (
              <Alert className="border-green-500 text-green-500">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Berhasil</AlertTitle>
                <AlertDescription>Semua file berhasil diunggah. Memulai analisis...</AlertDescription>
              </Alert>
            )}

            {uploadStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Terjadi kesalahan saat mengunggah file. Silakan coba lagi.</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center pt-8">
              <Button size="lg" className="px-12 py-3 text-lg" disabled={!canStartAnalysis()} onClick={simulateUpload}>
                {uploadStatus === "uploading" ? "Mengunggah..." : isAnalyzing ? "Memproses..." : "Mulai Analisis"}
              </Button>
            </div>

            {/* File Summary */}
            {(fastqFile || fastaFile || (!useDefaultDbSNP && dbsnpFile) || (!useDefaultBED && bedFile)) && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ringkasan File</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    {fastqFile && (
                      <div className="flex justify-between">
                        <span>FASTQ:</span>
                        <span className="font-medium">{fastqFile.name}</span>
                      </div>
                    )}
                    {fastaFile && (
                      <div className="flex justify-between">
                        <span>FASTA:</span>
                        <span className="font-medium">{fastaFile.name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>dbSNP:</span>
                      <span className="font-medium">
                        {useDefaultDbSNP ? "Default Database" : dbsnpFile?.name || "Tidak ada file"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>BED:</span>
                      <span className="font-medium">
                        {useDefaultBED ? "Default Database" : bedFile?.name || "Tidak ada file"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
