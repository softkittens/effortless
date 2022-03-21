export const transform = (pages = []) => {
  return pages.map((page) => {
    return {
      id: page.id,
      cover: page.cover?.file.url,
      ...extractProperties(page.properties)
    }
  })
}

function slugify(text) {
  return text.toLowerCase().replace(/ /g,"_")
}

const propertyMaper = {
  'rich_text': (p) => p.rich_text[0]?.plain_text,
  'title': (p) => p.title[0]?.text.content,
  'date': (p) => new Date(p.date.start),
  'checkbox': (p) => p.checkbox,
  'select': (p) => p.select?.name,
  'files': (p) => p.files[0]?.external.url,
}

function extractProperties(properties) {
  let result = {}
  for (const key of Object.keys(properties)) {
    const type = properties[key]?.type
    result[slugify(key)] = !!propertyMaper[type] ? propertyMaper[type](properties[key]) : null
  }
  return result
}
