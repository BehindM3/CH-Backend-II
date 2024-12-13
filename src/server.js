import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import path from 'path';
import { initMongoDB } from './config/db.connection.js';
import { errorHandler } from './middlewares/errorHandler.js'
import viewsRouter from './routes/views.routes.js';
import usersRouter from './routes/users.routes.js';
import './auth/githubStrategy.js';
import 'dotenv/config';

const { URL_DB, SECRET_KEY } = process.env;
const PORT = 8080;
const app = express();
const storeConfig = {
    store: MongoStore.create({
        mongoUrl: URL_DB,
        crypto: { secret: SECRET_KEY },
        ttl: 60,
    }),
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(cookieParser());
app.use(session(storeConfig))

//Configuracion Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars');

app.use(passport.initialize());
app.use(passport.session());

//Endpoints
app.use('/', viewsRouter);
app.use('/api', usersRouter);

app.use(errorHandler);

//Inicializacion DB
initMongoDB(URL_DB)
.then(() => console.log("Conectado correctamente con MongoDB"))
.catch(error => {
    console.log("Error al conectarse con MongoDB: ", error);
    process.exit(1);
})

//Inicializacion servidor
const serverHTTP = app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT} ---> http://localhost:${PORT}`));