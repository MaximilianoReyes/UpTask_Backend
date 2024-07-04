import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";
import { IUser } from "./User";

// TypeScript
export  interface IProject extends Document {
    projectName: string,
    clientName: string,
    description: string,
    tasks: PopulatedDoc<ITask & Document>[] // PopulatedDoc sirve para vincular un modelo child al modelo padre
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

// Mongoose
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true // Elimina los espacios inecesarios 
    },
    clientName: {
        type: String,
        required: true,
        trim: true 
    },
    description: {
        type: String,
        required: true,
        trim: true 
    },
    tasks: [
        {   
            type: Types.ObjectId,
            ref: 'Task'
        }
    ],
    manager: {
        type: Types.ObjectId,
        ref: 'User'
    },
    team: [
        {   
            type: Types.ObjectId,
            ref: 'User'
        }
    ],
    
}, {timestamps: true}) // Registra cada que creas o actualizas un registro

const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project