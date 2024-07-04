import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    name: string
    confirmed: boolean
}

const userSchema: Schema = new Schema({
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true // Garantiza que no haya usuarios duplicados
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model<IUser>('User', userSchema)
export default User