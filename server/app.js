import express from 'express'
import Movie from '../models/Movie.js'

const app = express()

app.use(express.urlencoded({ extended: true }))


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

  app.get('/review/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id)
    res.render('review', {
      movie
    })
  })
  
  app.post('/review/:id', async (req, res) => {
    const movieId = req.params.id
    const { content, rating } = req.body
    await Movie.addReview(movieId, content, rating)
    res.redirect(`/movie/${movieId}`)
  })



export default app
