-- CreateTable games
CREATE TABLE "Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "bannerUrl" TEXT NOT NULL
);

-- CreateTable ads
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "years_playing" INTEGER NOT NULL,
    "discord" TEXT NOT NULL,
    "week_days" TEXT NOT NULL,
    "hour_start" INTEGER NOT NULL,
    "hour_end" INTEGER NOT NULL,
    "use_voice_channel" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Ad_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
