import express from 'express';
import cors from 'cors';
import routes from './routes/Routes.js';

const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log('listening port 3000')

})