import express from "express"
import { verifyJwtToken } from "../helpers/authentication"
export const authentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token1" })
    }
    const decodedToken = verifyJwtToken(jwtToken, process.env.JWT_SECRET)
    if (!decodedToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token2" })
    }
    (req as any).jwtToken = decodedToken
    next();
}



export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const jwtToken = req.headers.authorization;
    if (!jwtToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token1" })
    }
    const decodedToken: any = verifyJwtToken(jwtToken, process.env.JWT_SECRET)
    if (!decodedToken) {
        return res.status(403).json({ success: false, message: "Geçersiz token2" })
    }
    if (!decodedToken.isAdmin) {
        return res.status(403).json({ success: false, message: "Yetkisiz erişim" })
    }
    next();
}