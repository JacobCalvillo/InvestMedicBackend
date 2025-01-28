import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";

const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtUser =  req.headers.authorization || null;
        const jwt = jwtUser?.split(' ').pop();
        const isOk = verifyToken(`${jwt}`);

        if (!isOk) {
            res.sendStatus(401).send("Sesion invalida");
            return;
        } else {
            console.log({jwtUser});
            next();
        }
    } catch (error) {
        res.sendStatus(400).send("Sesion invalida");
        return ;
    }
}


const sessionActive = async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.access_token;

    if (!token) {
        return res.sendStatus(403).send("Sesion invalida");
    }
    try {
        const data = verifyToken(token);
        
        if (!data) {
            return res.sendStatus(403).send("TOKEN INVALIDO");
        }

    } catch (error) {
        return res.sendStatus(500).send("Problemas con el servidor");
    }
    next();
}

export { checkJWT, sessionActive };