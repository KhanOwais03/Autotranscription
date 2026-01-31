'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, File, CheckCircle, XCircle } from 'lucide-react'

export default function FileUploadCard() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      uploadFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  async function uploadFile(file: File) {
    setStatus('uploading')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Upload failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-dashed border-gray-300 bg-white p-6 shadow-sm">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
      >
        <input {...getInputProps()} />

        {status === 'idle' && (
          <>
            <UploadCloud className="mb-3 h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium text-gray-700">
              Click to upload or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-500">
              SVG, PNG, JPG or PDF (max 5MB)
            </p>
          </>
        )}

        {status === 'uploading' && (
          <p className="text-sm font-medium text-indigo-600">
            Uploading…
          </p>
        )}

        {status === 'success' && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Upload complete</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Upload failed</span>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <File className="h-5 w-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
