import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = "my secret key";
const REFRESH_TOKEN_KEY = "refresh key";

export default function (db) {
    const user = express.Router();

    user.get("/", (req, res) => {
        res.send("user to be implemented");
    });

    return user;
};    
