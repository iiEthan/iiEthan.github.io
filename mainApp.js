import express from 'express'
import vhost from 'vhost'
import fs from 'fs'
import https from 'https'
import httpToHttps from 'express-http-to-https'
import { cams } from './camsApp.js'

const domain = 'ethangibbs.me'
const httpPort = 80
const httpsPort = 443 
const mainApp = express()

// Route cams subdomain
mainApp.use(vhost(`cams.${domain}`, cams))
mainApp.use(vhost(`${domain}`, httpToHttps.redirectToHTTPS()))
mainApp.use(express.static('public/main')) 
cams.use(express.static('public/OpenCams'))  

// Read the SSL certificate and key
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ethangibbs.me/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/ethangibbs.me/cert.pem', 'utf8')

// Create an HTTPS server
const server = https.createServer({
  key: privateKey,
  cert: certificate,
}, mainApp)

// Listen for HTTPS requests on the main domain
server.listen(httpsPort, `${domain}`, () => {
  console.log('HTTPS server is running on port ' + httpsPort)
})

// Listen for HTTP requests on the subdomain
mainApp.listen(httpPort, `cams.${domain}`, () => {
  console.log('HTTP server is running on port ' + httpPort)
})