export default {

  get(endpoint, params) {
    return fetch(endpoint + '?' + new URLSearchParams(params)).then((r) => r.json())
  },
  
  post(endpoint, data = {}) {
    return fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((r) => r.json())
  },

  upload(endpoint, file, method = 'POST') {
    const formData = new FormData()
    formData.append('myFile', file)

    return fetch(endpoint, {
      method,
      credentials: 'include',
      body: formData
    }).then((r) => r.json())
  }
}
