const express = require('express')

const app = express()
app.listen(3000, () => console.log("listening at 3000")) 
app.use(express.static("public")) // Load files in public directory
app.use(express.json({ limit: "1mb" })) // Prevent db from flooding
  
app.post("/api", (request, response) => {
  const data = request.body
  response.json({ // Returns to dbFunctions.js
    status: request.body
  })
})