import express from 'express';
import cors from 'cors';
import routes from './routes/productRoutes.js';
import userroutes from './routes/userRoutes.js';
import cardroutes from './routes/paymentcardsRoutes.js';
import ewalletroutes from './routes/paymentewalletRoutes.js';
import useraddressroutes from './routes/useraddressRoutes.js';
import sellerprofileroutes from './routes/sellerprofileRoutes.js';
import shopprofileroutes from './routes/shopprofileRoutes.js';
import productcategoriesroutes from './routes/productcategoryRoutes.js';
import productvariationsroutes from './routes/productvariationRoutes.js';
import productimageroutes from './routes/productimageRoutes.js';
import productreviewsroutes from './routes/productreviewsRoutes.js';
import productstatusroutes from './routes/productstatusRoutes.js';
import cartlistroutes from './routes/cartlistRoutes.js';
import previewimagesroutes from './routes/previewimagesRoutes.js';

const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', routes);
app.use('/api', userroutes);
app.use('/api', cardroutes);
app.use('/api', ewalletroutes);
app.use('/api', useraddressroutes);
app.use('/api', sellerprofileroutes);
app.use('/api', shopprofileroutes);
app.use('/api', productcategoriesroutes);
app.use('/api', productvariationsroutes);
app.use('/api', productimageroutes);
app.use('/api', productreviewsroutes);
app.use('/api', productstatusroutes);
app.use('/api', cartlistroutes);
app.use('/api', previewimagesroutes);

app.listen(port, () => {
    console.log('listening port 3000')

})