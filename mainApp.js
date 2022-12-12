import express from 'express'
import vhost from 'vhost'

const domain = 'localhost'
const port = 3000
const mainApp = express()
export const cams = express()

// Route cams subdomain
mainApp.use(vhost(`cams.${domain}`, cams))
mainApp.use(express.static("public/main")) 
cams.use(express.static("public/OpenCams")) 

//Start up express server
mainApp.listen(port, () => console.log(`listening at ${port}`)) 
