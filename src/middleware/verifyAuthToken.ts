import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
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

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      throw new Error(`Error in authorizationHeader`)
    }
    const token = authorizationHeader.split(' ')[1]
    const decoded = jwt.verify(token, token_secret)

    console.log("> Decoded");
    console.log(decoded);

    next()
  } catch (error) {
    res.status(401)
  }
}

export default verifyAuthToken;
