import express from 'express'

const app = express()

app.get("/ads", (req, res) => {
  return res.json([
    {id: "1", anúncio: "1"},
    {id: "2", anúncio: "2"},
    {id: "3", anúncio: "3"},
    {id: "4", anúncio: "4"},
    {id: "5", anúncio: "5"},
  ])
})

app.listen(3333)
