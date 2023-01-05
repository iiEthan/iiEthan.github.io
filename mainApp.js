import express from 'express'
import vhost from 'vhost'
import { cams } from './camsApp.js'
import { maps } from './mapsApp.js'

const domain = 'ethangibbs.me';
const port = '3000'
const app = express();
const main = express();

main.use(express.static('public/main')) 
main.use(express.json({ limit: "1mb" })) 

// Set up the vhost middleware
app.use(vhost(domain, main));
app.use(vhost(`cams.${domain}`, cams));
app.use(vhost(`maps.${domain}`, maps));

app.listen(port, () => console.log(`App listening on port ${port}`));
