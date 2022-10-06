import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


export async function addDB(title, url) {
    await db.read()

    db.data.cam.push({ id: db.data.cam.length, title: title, camURL: url})

    await db.write()
}
