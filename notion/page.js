export const transform = (pages = []) => {
  return pages.map((page) => {
    return {
      id: page.id,
      cover: page.cover.file.url,
      ...extractProperties(page.properties)
    }
  })
}

function extractProperties(properties) {
  for (const key of Object.keys(properties)) {
    if (properties[key].type === 'rich_text') {
      properties[key] = properties[key].rich_text[0].plain_text
    }
    if (properties[key].type === 'title') {
      properties[key] = properties[key].title[0].plain_text
    }
    if (properties[key].type === 'date') {
      properties[key] = new Date(properties[key].date.start)
    }
    if (properties[key].type === 'checkbox') {
      properties[key] = properties[key].checkbox
    }
  }
  return properties
}
