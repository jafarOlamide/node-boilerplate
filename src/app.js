import express from 'express';
import { port  as EnvPort, environment} from './config/config.js';
import cors from 'cors';
import router from './routes/index.js';
import { DBConnection } from './config/db.config.js';
import { NotFoundError } from './utils/CustomErrors.js';
import { customErrorHandler } from './middlewares/errorHandler.js';

const app = express();

const port = EnvPort || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.json({ message: "Welcome to A test API." });
});


app.use("/api/v1", router);


app.listen(port, () => {
    console.log(`App Listening on Port ${port}`);
}).on("error", e => console.error(e));


/************************************************************
    Catch 404 and forward to error handler
************************************************************/ 
app.use((req, res, next) => next(new NotFoundError("Sorry, url not found!")));

/************************************************************
    Custom error handler for all routes
************************************************************/
app.use(customErrorHandler);

DBConnection();


