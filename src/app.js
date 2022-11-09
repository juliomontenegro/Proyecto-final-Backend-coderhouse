import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewRoutes from './routes/viewRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import initializePassport from './config/passport.js';
import passport from 'passport';
import dotenv from 'dotenv';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error server: ${error}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
app.use(cookieParser());
app.use(
    session({
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASS}@${process.env.MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
        mongoOptions: {useNewUrlParser: true,useUnifiedTopology: true,},
        ttl:600
      }),
      secret: 'asdafsfgdfgdfg',
      resave: false,
      saveUninitialized: false,
    }))


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views',__dirname+ '/views');
app.use('/', viewRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/carrito',cartRoutes);
app.use('/api/ordenes',orderRoutes);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

