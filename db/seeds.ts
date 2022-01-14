import db from "./index"
import manga_list from "./manga_list_v1.json"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  for (let i = 0; i < manga_list.length; i++) {
    const manga = manga_list[i];
    let title, image, description;
    if (manga?.meta) {
      title = manga.meta.title
      description = manga.meta.description
    }
    if (manga?.og) {
      title = manga.og.title
      image = manga.og.image
      description = manga.og.description
    }
    try {
      await db.bookmarks.create({
        data: {
          url: manga?.url || "",
          name: title || "",
          image: image || "",
          genre: "",
          description: description || "",
          is_reading: true,
        }
      })
    } catch (err) {
      console.log(err, manga);
    }
  }
}

export default seed
