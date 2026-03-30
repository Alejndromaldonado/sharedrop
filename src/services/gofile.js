const BASE = 'https://api.gofile.io'

// 1. Obtiene el servidor más rápido disponible
export async function getBestServer() {
  const res = await fetch(`${BASE}/servers`)
  const { data } = await res.json()
  return data.servers[0].name  // ej: "store1"
}

// 2. Sube un archivo y retorna el link de descarga
export async function uploadFile(file, onProgress) {
  const server = await getBestServer()
  const url = `https://${server}.gofile.io/contents/uploadfile`

  const formData = new FormData()
  formData.append('file', file)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Progreso real en tiempo real
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100)
        onProgress?.(pct)
      }
    })

    xhr.addEventListener('load', () => {
      const data = JSON.parse(xhr.responseText)
      if (data.status === 'ok') {
        resolve({
          downloadPage: data.data.downloadPage,  // link para compartir
          fileId: data.data.fileId,
          fileName: file.name,
          fileSize: file.size,
        })
      } else {
        reject(new Error('Upload failed'))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Network error')))
    xhr.open('POST', url)
    xhr.send(formData)
  })
}
