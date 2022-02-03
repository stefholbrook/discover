const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
})

// CREATE TABLE IF NOT EXISTS artists(
//   id text NOT NULL,
//   spotify_id text NOT NULL,
//   artist text NOT NULL,
//   updated_at int NOT NULL,
//   deleted bool NOT NULL,
//   PRIMARY KEY(id)
// );

export default async function insertArtist(data) {
  try {
    const poolResult = await pool.query("SELECT NOW()")
    console.log("Time with pool: " + poolResult.rows[0]["now"])

    // const { name, email, password } = request.body
    console.log(artists)

    // pool.query('INSERT INTO artists (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error, results) => {
    //   if (error) throw error

    // response.status(200).json(results.rows)
    // })
    return true
  } catch (error) {
    console.error(error.stack)
    return false
  } finally {
    await pool.end()         // closes connection
  }
}
