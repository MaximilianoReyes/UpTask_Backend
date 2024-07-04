import type { Request, Response, NextFunction } from 'express'
import Project, { IProject } from '../models/Project'  

// Esto es para poder compartir los valores de project de nuestro modelo de forma global mediante el Request
declare global{
    namespace Express {
        interface Request { // Utilizamos interface en ves de type porque el interface puede ser utsado para agregar nuevos parametros a las clases ya existentes, type los sobre escribe
            project: IProject
        }
    }
}

export async function projectExists( req: Request, res: Response, next: NextFunction) {
    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)
        if(!project) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}