import { transporter } from '../config/nodemailer'

interface IEmail {
    email: string
    name: string
    token: string
}

export class AuthEmail {
    static SendConfirmationEmail = async ( user : IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: `<p>Hola ${user.name}, has creado tu cuenta en UpTask, confirma tu cuenta</p>
                   <p>Visita el siguiente enlace:</p> 
                   <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
                   <p>Ingresa el codigo: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }

    static SendPasswordResetToken = async ( user : IEmail) => {
        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Restablece la contraseña',
            text: 'UpTask - Restablece la contraseña',
            html: `<p>Hola ${user.name}, has solicitado restablecer tu password.</p>
                   <p>Visita el siguiente enlace:</p> 
                   <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer contraseña</a>
                   <p>Ingresa el codigo: <b>${user.token}</b></p>
                   <p>Este token expira en 10 minutos</p>
            `
        })

        console.log('Mensaje enviado', info.messageId)
    }
}
