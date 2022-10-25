import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import express from 'express'

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, './public/OpenCams/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Start up express server
const app = express()
app.listen(3000, () => console.log("listening at 3000")) 
app.use(express.static("public")) // Load files in public directory
app.use(express.json({ limit: "1mb" })) // Prevent db from flooding

// POST requests
app.post("/api/:id", async (request, response) => {
  const cam = request.body
  
  // Verify validity of data before pushing
  const validate = validateData(cam)
  const isDataValid = validate[0], status = validate[1]

  if (isDataValid) {
    await db.read()
    db.data.cam.push(cam)
    await db.write()
  }
  
  response.json({
    status: status,
    body: request.body
  })
})

// GET all
app.get('/api', async (request, response) => {
  await db.read()
  response.json(db.data);
});

// GET specific cam
app.get('/api/:id', async (request, response) => {
  const id = request.params.id - 1
  await db.read()
  response.json(db.data.cam[id]);
});

// DELETE cam
app.delete('/api/:id', async (request, response) => {
  const id = Number(request.params.id)
  await db.read()
  let cameras = db.data.cam
  const deletedCam = db.data.cam[id]

  // Remove item from the cam array
  cameras = cameras.filter(i => i.id !== id)

  // Reorder the id's so there is no gap
  reorder(cameras)

  db.data.cam = cameras
  db.write()

  response.json({body: deletedCam});
})

// UPDATE cam
app.patch("/api/:id", async (request, response) => {
  const cam = request.body
  const id = Number(request.params.id)
  cam.id = id

  // Verify validity of data before pushing
  const validate = validateData(cam)
  const isDataValid = validate[0], status = validate[1]

  if (isDataValid) {
    await db.read()
    db.data.cam[id] = cam
    await db.write()
  }
  
  response.json({
    status: status,
    body: request.body
  })
})

function validateData(content) {
  // Check to see if all keys are in object
  if ("title" in content && "url" in content && "id" in content) {
    return [true, "Success"]
  } else {
    return [false, "Failed: Bad data formatting"]
  }

    // TODO: Check duplicate title, make sure camURL works

}

function reorder(content) {
  let count = 0
  content.forEach(item => {
    item.id = count
    count++
  })

}