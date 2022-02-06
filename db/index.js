import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config()

const sql = postgres({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // debug: (connection, query, params) => {
  //   console.log({ connection })
  //   console.log({ query })
  //   console.log({ params })
  // }
})

export { sql as raw }

export const db = async (uid = false) => {
  if (!uid) {
    return sql
  }

  return async (strings, ...args) => {
    return await sql.begin(async (sql) => {
      await sql.unsafe(`set local auth.uid to '${uid}'`)
      return sql(strings, ...args)
    })
  }
}
