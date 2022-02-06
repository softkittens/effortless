import * as cookie from 'cookie'
import { db, raw } from '../db/index.js'
import jsonwebtoken from 'jsonwebtoken'

export async function setup({ event, resolve }) {
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')

  if (!cookies.session) {
    event.locals.sql = await db()
    return await resolve(event)
  }

  const jwt = await jsonwebtoken.verify(cookies.session, process.env.SECRET)
  const sql = await db(jwt.sub)
  event.locals.sql = sql
  event.locals.raw = raw

  const [user] = await sql`select id, email from users where id = ${jwt.sub}`
  event.locals.user = user

  return await resolve(event)
}
