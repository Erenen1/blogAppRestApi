import { createUser, getUserByEmail } from "../db/models/user";
import express from "express";
import { authentication, createJwtToken, hashPassword } from "../helpers/authentication";
import { validateLogin, validateRegister } from "../helpers/validation"

export const login = async (req: express.Request, res: express.Response) => {
    const { email, password } = req.body
    try {
        const { error } = validateLogin(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const user = await getUserByEmail(email);
        if (!user) {
            return res.sendStatus(400);
        }
        const isMatch = await authentication(password, user.password);
        if (!isMatch) {
            return res.sendStatus(403)
        }
        let isAdmin: boolean = false;
        if (user.email === "burak@gmail.com" || user.email === "eren@gmail.com") {
            isAdmin = true;
        }
        const jwtToken = createJwtToken(user._id.toString(), user.username, isAdmin);

        //jwt tokenı yollama işini sor burağa
        return res.status(302).setHeader("auhtorization", jwtToken).json({ success: true, message: "Hesaba başarıyla giriş yapıldı.", jwtToken: jwtToken })
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    const { username, email, password } = req.body;
    try {
        const { error } = validateRegister(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Bu email adresi zaten kayıtlı. Lütfen başka bir email adresi deneyin" })
        }
        const hashedPassword = await hashPassword(password);
        const user = await createUser({
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({ success: true, message: "Hesap başarıyla oluşturuldu.", user: user })
    } catch (error) {
        console.log(error)
        return res.status(400).json();
    }
}