require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    app.emit('pronto');
}).catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
//app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'asdasdwadw',
store: MongoStore.create({
    mongoUrl: process.env.CONNECTIONSTRING,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    collectionName: 'sessions'
}),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
}
});

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(middlewareGlobal);
app.use(csrf());
app.use(csrfMiddleware);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.messages = req.flash();
  next();
});
app.use(routes);
app.use(checkCsrfError);


app.on('pronto', () => {
    app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
    console.log('Servidor execuntando na porta 3000')
});
});

