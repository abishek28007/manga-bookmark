import db from "db"

export default async function getMangaList(_ = null) {
  try {
    return await db.bookmarks.findMany({})
  } catch (err) {
    return []
  }
}
