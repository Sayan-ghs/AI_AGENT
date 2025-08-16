import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import user from "../models/user.model"
import { Inngest } from "inngest"
import userModel from "../models/user.model"

export const signup = async (req,res)=>{
        const {email,password,skill=[]} = req.body
        try{
                const hashed = bcrypt.hash(password,10)
                const user = await userModel.create({email,password:hashed,skill})
                // fire inngest event
                await Inngest.send({
                        name : "user/signup",
                        data : {
                                email 
                        }
                })

                const token = jwt.sign({_id:user._id,role:user.role},
                process.env.JWT_SECRET)

                res.json({
                        user,token
                })

        }
        catch(error){
                res.status(500).json({
                        error:"signup fail",
                        details : error.message
                })
        }
}

export const login = async (req,res)=>{
        const {email,password} = req.data;
        try{
                const user = userModel.findOne({email})
                if(!user) {
                        return req.status(401).json({
                                message:"user not found"
                        })
                }
                const isMatch = await bcrypt.compare(password,user.password)
                if(!isMatch){
                        return res.status(401).json({
                                message:"invalid credential"
                        })
                }
        }catch(error){
                res.status(500).json({
                        error:"signup fail",
                        details : error.message
                })
        }
}
export const logout = async (req,res) =>{
        try{
                const token = req.headers.authorization.split(" ")[1]
                if(!token) return res.status(401).json({
                        message : "unauthorized"
                })
                jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                        if(err) return res.status(401).json({
                                message : "unauthorized"
                        })
                })
                res.json({message : "Logout Successfully"})
        }
        catch(error){
                        res.status(500).json({
                        error:"logout fail",
                        details : error.message
                })
        }
}

export const updateUser = async (req,res) =>{
        const { skills = [],role,email} = req.body
        try{
                if(req.user?.role!="admin"){
                        return res.status(401).json({
                                message : "User not found"
                        })
                }
                await userModel.updateOne(
                        {email},
                        {skills : skills.length? skills : user.skills,role}
                )
                return res.json({message:"user Updated success"})
        }
        catch(error){
                        res.status(500).json({
                        error:"logout fail",
                        details : error.message
                })
        }
}

export const getUser = async (req,res)=>{
        try{
                if(req.user.role!=="admin"){
                        return res.status(403).json({
                                error : "forbidden"
                        })
                }
                const users = await userModel.find().select("-password")
                return res.json(users)
        }        catch(error){
                        res.status(500).json({
                        error:"failed to get user",
                        details : error.message
                })
        }
}