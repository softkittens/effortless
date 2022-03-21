import { transform } from './page.js'

const http = (method, endpoint, body) => {
  return fetch('https://api.notion.com/v1/' + endpoint, {
    method,
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${process.env.NOTION}`,
      'Notion-Version': '2021-08-16',
      'Content-Type': 'application/json',
    },
  })
    .then((r) => r.json())
    .then((r) => r.results || r);
};

export const fetchDatabase = async (id, body) => {
  const response = await http('POST', `databases/${id}/query`, body);
  return transform(response);
};

export const fetchPage = async (id) => {
  const response = await http('GET', `pages/${id}`);
  return transform([response])[0]
};

export const fethPageBySlug = async (database, slug) => {
  return fetchDatabase(database, {
    filter: {
      property: 'slug',
      rich_text: {
        equals: slug,
      },
    },
  });
};

export const fetchBlocks = async (id) => {
  const blocks = await http('GET', `blocks/${id}/children?page_size=100`);
  for await (const block of blocks) {
    if (block.has_children) {
      block.children = await fetchBlocks(block.id);
    }
    if (block.paragraph?.text[0]?.mention?.type === 'page') {
      block.page = await fetchPage(block.paragraph?.text[0]?.mention?.page.id);
    } 
  }
  return blocks;
};
