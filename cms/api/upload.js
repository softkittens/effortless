export async function post({ request }) {
  const data = await request.formData()
  const file = data.get('myFile')
  await fetch(process.env.UPLOAD_PATH, {
    method: 'PUT',
    body: file,
    headers: {
      AccessKey: process.env.UPLOAD_KEY
    }
  })

  return {
    body: { file }
  }
}
