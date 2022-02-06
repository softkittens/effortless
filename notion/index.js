import { transform } from "./page.js"

const http = (method, endpoint, body) => {
  return fetch('https://api.notion.com/v1/' + endpoint, {
    method,
    body,
    headers: {
      Authorization: `Bearer ${process.env.NOTION}`,
      'Notion-Version': '2021-08-16',
      'Content-Type': 'application/json'
    }
  })
    .then((r) => r.json())
    .then((r) => r.results)
}

export const fetchDatabase = async (id, body) => {
  const response = await http('POST', `databases/${id}/query`, body)
  return transform(response)
}

export const fetchPage = async (id) => {
  return http('GET', `pages/${id}`)
}

export const fethPageBySlug = async (database, slug) => {
  return fetchDatabase(
    database,
    JSON.stringify({
      filter: {
        property: 'slug',
        rich_text: {
          equals: slug
        }
      }
    })
  )
}

export const fetchBlocks = async (id) => {
  return http('GET', `blocks/${id}/children?page_size=100`)
}
