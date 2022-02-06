export async function get({ params, locals: { sql, raw }, url: { searchParams } }) {
  
  const columns = (searchParams.get('columns')).split(',')
  
  const data = await sql`select ${raw(columns)} from ${raw(params.table)}`

  return { body: { data } }
}

export async function post({ request, locals: { sql } }) {}
export async function put({ request, locals: { sql } }) {}
export async function del({ request, locals: { sql } }) {}
