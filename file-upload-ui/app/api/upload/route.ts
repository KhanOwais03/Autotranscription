import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file' }, { status: 400 })
  }

  // You can:
  // - Upload to S3 / Azure Blob / GCS
  // - Save locally
  // - Validate MIME type

  console.log('Uploaded file:', file.name)

  return NextResponse.json({ success: true })
}
