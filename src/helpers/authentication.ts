import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "../config";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);
export const authentication = (password: string, expectedPassword: string) => bcrypt.compare(password, expectedPassword)

export const createJwtToken = (userId: string, username: string, isAdmin: boolean) => jwt.sign({ userId: userId, username: username, isAdmin: isAdmin }, config.JWT_SECRET!, { expiresIn: "2h" })
export const verifyJwtToken = (token: string, secret: string) => jwt.verify(token, secret);