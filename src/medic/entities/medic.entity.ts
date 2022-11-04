import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'

export const MedicSchema=new mongoose.Schema({
    name:String,
    prix:Number,
    description:String,
    image:String,

})
export interface Medic {
    name:string;
    prix:number;
    description:string;
    image:string;
}
