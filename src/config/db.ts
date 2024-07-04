import mongoose from "mongoose"
import colors from 'colors'
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL) // Aqui conectamos a la base de datos, se aplica destruction a connection
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        exit(1) // Esto termina la conexion con un mensaje de error
    }
}