import express from 'express';
import vhost from 'vhost';
import { cams } from './routes/camsApp.js';
import { maps } from './routes/mapsApp.js';

const domain = 'localhost';
const port = '3000';
const app = express();
const main = express();

// Set up the vhost middleware
app.use(vhost(domain, main));
app.use(vhost(domain, cams));
app.use(vhost(domain, maps));

app.listen(port, () => console.log(`App listening on port ${port}`));
