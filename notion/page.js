import {slugify} from '../lib/utils.js'

export const transform = (pages = []) => {
  if (!pages.length) return []
  return pages.map((page) => {
    return {
      id: page.id,
      cover: page.cover?.file.url,
      database: page.parent?.database_id,
      ...extractProperties(page.properties)
    }
  })
}

const propertyMaper = {
  'rich_text': (p) => p.rich_text[0]?.plain_text,
  'title': (p) => p.title[0]?.text.content,
  'date': (p) => new Date(p.date.start),
  'checkbox': (p) => p.checkbox,
  'select': (p) => p.select?.name,
  'files': (p) => p.files[0]?.external.url,
  'url': (p) => p.url,
  'relation': (p) => p.relation[0]?.id,
  'multi_select': (p) => p.multi_select.map(ms => ms.name),
  'rollup': (p) => p.rollup.array.length ? propertyMaper[p.rollup.array[0].type](p.rollup.array[0]) : '',
}

function extractProperties(properties) {
  let result = {}
  for (const key of Object.keys(properties)) {
    const type = properties[key]?.type
    result[slugify(key, '_')] = !!propertyMaper[type] ? propertyMaper[type](properties[key]) : null
  }
  return result
}
