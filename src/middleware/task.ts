import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'  

// Esto es para poder compartir los valores de project de nuestro modelo de forma global mediante el Request
declare global{
    namespace Express {
        interface Request { // Utilizamos interface en ves de type porque el interface puede ser utsado para agregar nuevos parametros a las clases ya existentes, type los sobre escribe
            task: ITask
        }
    }
}

export async function taskExists( req: Request, res: Response, next: NextFunction ) {
    try {
        const { taskId } = req.params
        const task = await Task.findById(taskId)
        if(!task) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error: error.message})
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}

export function taskBelongsToProject( req: Request, res: Response, next: NextFunction ) {
    if(req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error('Accion no valida')
        return res.status(400).json({error: error.message})
    }
    next()
}

export function hasAuthorization( req: Request, res: Response, next: NextFunction ) {
    if(req.user.id.toString() !== req.project.manager.toString()) {
        const error = new Error('Accion no valida')
        return res.status(400).json({error: error.message})
    }
    next()
}


