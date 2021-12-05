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
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
    app.post('/users/authenticate', authenticate)
    app.post('/users/:id', verifyAuthToken, update)
    app.delete('/users/:id', verifyAuthToken, destroy)
}

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.params.id)
    res.json(user)
}


const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }

    try {
        const newUser = await store.create(user)

        var token = jwt.sign({ user: newUser }, token_secret);

        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(`Route-> Error : ${err} + user: ${user}`)
    }
}

const update = async (req: Request, res: Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }
    try {
        const authorizationHeader: string = req.headers.authorization ? req.headers.authorization : "";
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, token_secret)
        if ((<any>decoded).id !== user.id) {
            throw new Error('User id does not match!')
        }
    } catch (err) {
        res.status(401)
        res.json(err)
        return
    }

    try {
        const updated = await store.create(user)
        res.json(updated)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.params.id)
    res.json(deleted)
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }
    try {
        const u = await store.authenticate(user.firstName, user.password)
        var token = jwt.sign({ user: u }, token_secret);
        res.json(token)
    } catch (error) {
        res.status(401)
        res.json({ error })
    }
}

export default userRoutes