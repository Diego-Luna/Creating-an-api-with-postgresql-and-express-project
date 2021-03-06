import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { User, UserStore } from '../models/users'
import dotenv from 'dotenv'

dotenv.config()

const {
    TOKEN_SECRET } = process.env

if (typeof TOKEN_SECRET == 'undefined') {
    console.log('Error in BCRYPT_PASSWORD or SALT_ROUNDS is undefined');
    Error('Error in BCRYPT_PASSWORD or SALT_ROUNDS is undefined')
} else {
    var token_secret: string = TOKEN_SECRET;
}


const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', verifyAuthToken, create)
    // app.post('/users', create)
    app.post('/users/authenticate', authenticate)
    app.post('/users/:id', verifyAuthToken, update)
}

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const user = await store.show(_req.params.id)
        res.json(user)
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }
}


const create = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password
    }

    try {
        const newUser = await store.create(user)

        var token = jwt.sign({ user: newUser }, token_secret);

        res.json(token)
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }
}

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password
    }
    try {
        const authorizationHeader: string = req.headers.authorization ? req.headers.authorization : "";
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, token_secret)
        if ((<any>decoded).id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: req.body.password
    }
    try {
        const u = await store.authenticate(user.firstname, user.password)
        var token = jwt.sign({ user: u }, token_secret);
        res.json(token)
    } catch (error) {

        res.status(400).send(`Error -> ${error}`)
    }
}

export default userRoutes