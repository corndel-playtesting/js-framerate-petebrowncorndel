import db from '../db/index.js'

class Movie {
  static allowedGenres = [
    'Adventure',
    'Action',
    'Animation',
    'Biography',
    'Crime',
    'Drama',
    'Fantasy',
    'History',
    'Horror',
    'Mystery',
    'Romance',
    'War'
  ]

  static async findAll(genre) {
    const query = [
      'select movies.*',
      'from movies',
      'left join reviews on movies.id = reviews.movieId'
    ]

    const values = []

    if (genre) {
      query.push('where lower(movies.genre) like ?')
      values.push('%' + genre + '%')
    }

    query.push('group by movies.id')
    query.push('order by movies.releaseDate desc')

    const results = await db.raw(query.join(' '), values)
    return results
  }

  static async findById(id) {
    const query = 'select * from movies where id = ?'
    const results = await db.raw(query, [id])
    return results[0]
  }

  static async findReviews(id) {
    const query = 'select * from reviews where movieId = ?'
    const results = await db.raw(query, [id])
    return results
  }

  static async addReview(movieId, content, rating) {
    const query = 'INSERT INTO reviews (movieId, content, rating) VALUES (?, ?, ?)'
    await db.raw(query, [movieId, content, rating])
  }
}

export default Movie
