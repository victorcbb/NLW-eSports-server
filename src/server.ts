import { PrismaClient } from "@prisma/client"
import express from 'express'
import cors from 'cors'

import { convertHourToMinutes } from "./utils/convertHourToMinutes"
import { convertMinutesToHours } from './utils/convertMinutesToHours'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  })
  
  return res.json(games)
})

app.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id
  const body: any = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      years_playing: body.years_playing,
      discord: body.discord,
      week_days: body.week_days.join(','),
      hour_start: convertHourToMinutes(body.hour_start),
      hour_end: convertHourToMinutes(body.hour_end),
      use_voice_channel: body.use_voice_channel,
    }
  })

  return res.status(201).json(ad)
})

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      week_days: true,
      use_voice_channel: true,
      years_playing: true,
      hour_start: true,
      hour_end: true,
    },
    where: {
      gameId
    },
    orderBy: {
      created_at: "desc"
    }
  }) 

  return res.json(ads.map(ad => {
    return {
      ...ad,
      week_days: ad.week_days.split(','),
      hour_start: convertMinutesToHours(ad.hour_start),
      hour_end: convertMinutesToHours(ad.hour_end),
    }
  }))
})

app.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return res.json({
    discord: ad.discord
  })
})

app.listen(3333)
