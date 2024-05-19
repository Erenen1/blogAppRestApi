import express from "express";
import {  getUserById, getUsers, updateUserById, deleteUserById } from "../db/models/user"
import { hashPassword } from "../helpers/authentication";
import { validateId, validateUserUpdate } from "../helpers/validation"

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json();
        console.log(error)
    }
}

export const getUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const { error } = validateId(userId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json()
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error)
        return res.status(404).json();
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const { username, password } = req.body;
    const { error } = validateId(userId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const { error } = validateUserUpdate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: "Validation error" })
        }
        const hashedPassword = await hashPassword(password);
        await updateUserById(userId, {
            username,
            password: hashedPassword
        });
        res.status(200).json({ success: true, message: "Hesap başarıyla güncellendi." })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Hesap güncellemenedi." });
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const { error } = validateId(userId);
    if (error) {
        return res.status(400).json({ success: false, message: "Validation error" })
    }
    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "Böyle bir kullanıcı bulunamadı." })
        }
        const deletedUser = await deleteUserById(userId);
        return res.status(200).json({ success: true, message: "Kullanıcı başarıyla silindi.", deletedUser: deletedUser })
    } catch (error) {
        return res.status(400).json({ success: false, message: "Kullanıcı silinemedi." })
    }
}