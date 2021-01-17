import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

const port = process.env.PORT || 3001;
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

app.use(logger('dev'));
app.enable('trust proxy');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', (req, res) => {
  res.send({ hello: 'world' });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`PopKwiz listening on port ${port}!`);
});
