import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello from FrameRate!')
})

export default app
