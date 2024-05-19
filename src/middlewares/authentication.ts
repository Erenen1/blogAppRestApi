import express from "express"
import { verifyJwtToken } from "../helpers/authentication"
import { config } from "../config"

export const authentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token" })
    }
    const decodedToken = verifyJwtToken(jwtToken, config.JWT_SECRET! as string)
    if (!decodedToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token" })
    }
    (req as any).jwtToken = decodedToken
    next();
}

export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token" })
    }
    const decodedToken: any = verifyJwtToken(jwtToken, config.JWT_SECRET! as string)
    if (!decodedToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token" })
    }
    if (!decodedToken.isAdmin) {
        return res.status(403).json({ success: false, message: "Yetkisiz erişim" })
    }
    next();
}