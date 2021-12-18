-- CreateTable
CREATE TABLE "Bookmarks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "is_reading" BOOLEAN NOT NULL,
    "genre" TEXT NOT NULL
);
