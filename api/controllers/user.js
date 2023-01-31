import { json } from "express"
import {db} from "../db.js"
import jwt from "jsonwebtoken";


export const updateProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
    const q = "UPDATE users SET `img`=? WHERE `id` = ?"

      const values = [

        req.body.img,
      ]

      db.query(q, [...values, userInfo.id], (err, data)=> {
        if(err) return res.status(500).json(err)

        return res.json("User has been updated")
      })
})    
}

export const getProfile = (req, res) => {
    
    const q = "SELECT * FROM users WHERE `id` = ?"
    
    db.query(q,  (err, data)=> {
        if(err) return res.status(500).json(err)
 
        return res.status(200).json(data[0])
    })
}

