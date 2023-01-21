import express from 'express'
import vhost from 'vhost'
import { cams } from './routes/camsApp.js'
import { maps } from './routes/mapsApp.js'
//import { join } from 'path';

const domain = 'localhost';
const port = '3000'
const app = express();
const main = express();

//app.use(express.static(join(process.cwd(), 'dist')));

//app.get('*', (req, res) => {
//    console.log(req.path)
//    res.sendFile(join(process.cwd(), 'dist', req.path, 'index.html'));
//});

main.use(express.static('dist')) 
main.use(express.json({ limit: "1mb" })) 

// Set up the vhost middleware
app.use(vhost(domain, main));
app.use(vhost(`cams.${domain}`, cams));
app.use(vhost(`maps.${domain}`, maps));

app.listen(port, () => console.log(`App listening on port ${port}`));
