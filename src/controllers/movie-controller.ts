import { Request, Response } from "express";
import movieService from "../services/movie-service";
import MovieOutputDTO from "../dtos/movie/movie-output-dto";

class MovieController {

    public async save(req: Request, res: Response) {
        const outputDTO: MovieOutputDTO = await movieService.save(req.body);
        return res.status(201).json(outputDTO);
    }

    public async findAll(req: Request, res: Response) {
        const outputDTOs: Array<MovieOutputDTO> = await movieService.findAll();
        return res.status(200).json(outputDTOs);
    }

    public async findById(req: Request, res: Response) {
        const outputDTO: MovieOutputDTO = await movieService.findById(req.params.id);
        return res.status(200).json(outputDTO);
    }

    public async update(req: Request, res: Response) {
        const outputDTO: MovieOutputDTO = await movieService.update(req.body, req.params.id);
        return res.status(200).json(outputDTO);
    }

    public async deleteById(req: Request, res: Response) {
        await movieService.deleteById(req.params.id);
        return res.sendStatus(204);
    }
}

export default new MovieController();