import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
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
    app.get('/users/{:id}', show)
    app.post('/users', create)
    app.delete('/users', destroy)
    app.post('/users/authenticate', authenticate)
}

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    const user = await store.show(_req.body.id)
    res.json(user)
}


const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }

    console.log("-> User:");
    console.log(user);


    try {
        const newUser = await store.create(user)
        console.log("--> newUser");
        console.log(newUser);

        var token = jwt.sign({ user: newUser }, token_secret);
        console.log("--> token");
        console.log(token);
        res.json(token)
    } catch (err) {
        res.status(400)
        res.json(`Route-> Error : ${err} + user: ${user}`)
    }
}

const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.body.id)
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