import { kStringMaxLength } from 'buffer';
import * as mongoose from 'mongoose'

export const UserSchema= new mongoose.Schema({
    prenom:{type:String,require:true},
    nom:{type:String,require:true},
    email:{type:String, require:true,unique:true},
    password:{type:String,require:true},
    avatar:{type:String}
})
export interface User {
    prenom: string;
    nom:string;
    email:string;
    password:string,
    avatar:string;
}
