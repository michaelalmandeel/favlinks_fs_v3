const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getLinks = (request, response) => {
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getLinkById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createLink = (request, response) => {
    const { name, url } = request.body
    console.log("received new link: "+request.body)
    pool.query('INSERT INTO links (name, url) VALUES ($1, $2) RETURNING *', [name, url], (error, results) => {
      if (error) {
        throw error
      }
      response.json({id: results.rows[results.rows.length-1].id})
    })
  }

  const updateLink = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, url } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, url = $2 WHERE id = $3',
      [name, url, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Link modified with ID: ${id}`)
      }
    )
  }

  const deleteLink = (request, response) => {
    const id = parseInt(request.params.id)
    console.log("received delete for: "+id)
    pool.query('DELETE FROM links WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.json({deleted: id})
    })
  }

  module.exports = {
    getLinks,
    getLinkById,
    createLink,
    updateLink,
    deleteLink,
  }