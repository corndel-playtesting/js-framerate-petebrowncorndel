import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

// TODO: add your endpoints here

app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    const movies = await Movie.findAll()
    res.render('index', {
        movies
    })
  })

  app.get('/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    const reviews = await Movie.findReviews(req.params.id)
    res.render('movie', {
      movie,
      reviews
    })
  })


export default app
