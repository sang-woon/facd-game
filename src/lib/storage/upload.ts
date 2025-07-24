import { createClient } from '@/lib/supabase/client'

const BUCKET_NAME = 'complaints'
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export interface UploadResult {
  url: string
  path: string
  error?: string
}

export async function uploadFile(
  file: File,
  userId: string,
  complaintId: string
): Promise<UploadResult> {
  const supabase = createClient()
  
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return { url: '', path: '', error: '파일 크기는 10MB를 초과할 수 없습니다.' }
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${complaintId}/${Date.now()}.${fileExt}`

  // Upload file
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    return { url: '', path: '', error: error.message }
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path)

  return { url: publicUrl, path: data.path }
}

export async function deleteFile(path: string): Promise<boolean> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([path])

  return !error
}

export async function getSignedUrl(path: string, expiresIn = 3600): Promise<string | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Error creating signed URL:', error)
    return null
  }

  return data.signedUrl
}