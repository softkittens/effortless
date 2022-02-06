export async function loadNavFromFiles() {
  // this is stupid but vite doesnt support options so I can call {directoriesOnly: true}
  const modules = import.meta.globEager('/src/routes/admin/**')
  const regex = new RegExp('(?<=admin/)(.*)(?=\/)') //extract folder names
  let nav = await Promise.all(
    Object.entries(modules).map(async ([filename]) => {
      return regex.exec(filename) ? regex.exec(filename)[0] : null 
    })
  )
  nav = nav.filter(path => path && path !== 'api')
  return nav = [...new Set(nav)] //filter unique
}
