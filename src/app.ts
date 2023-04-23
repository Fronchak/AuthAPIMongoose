import express from 'express';
import errorHandler from "./error-handling/error-handler";
import authRoutes from './routes/auth-routes';
import genreRoutes from './routes/genre-routes';
import movieRoutes from './routes/movie-routes';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    private middlewares() {
        this.server.use(express.json());
    }

    private routes() {
        this.server.use('/auth', authRoutes);
        this.server.use('/genres', genreRoutes);
        this.server.use('/movies', movieRoutes);
    }

    private errorHandler() {
        this.server.use(errorHandler);
    }
}

export default App;