import { Request, Response } from "express";
import GenreOutputDTO from "../dtos/genre/genre-output-dto";
import genreService from "../services/genre-service";


class GenreController {

    public async save(req: Request, res: Response) {
        const outputDTO: GenreOutputDTO = await genreService.save(req.body);
        return res.status(201).json(outputDTO);
    }

    public async update(req: Request, res: Response) {
        const outputDTO: GenreOutputDTO = await genreService.update(req.body, req.params.id);
        return res.status(200).json(outputDTO);
    }

    public async findById(req: Request, res: Response) {
        const outputDTO: GenreOutputDTO = await genreService.findById(req.params.id);
        return res.status(200).json(outputDTO);
    }

    public async findAll(req: Request, res: Response) {
        const outputDTOs: Array<GenreOutputDTO> = await genreService.findAll();
        return res.status(200).json(outputDTOs);
    }

    public async deleteById(req: Request, res: Response) {
        await genreService.deleteById(req.params.id);
        return res.sendStatus(204);
    }
}

export default new GenreController();