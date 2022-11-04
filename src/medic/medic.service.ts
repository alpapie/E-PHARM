import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Medic } from './entities/medic.entity';

@Injectable()
export class MedicService {
  constructor(@InjectModel('medic') private MedicSchema: Model<Medic>){}
  
 async create(user) {
    let usernew;
    try{
      usernew= await new this.MedicSchema(user)
      await usernew.save()
    }catch(error){
      throw new NotFoundException("erreur lors de l'enregistrement")
    }
    return true;
  }

  async findAll() {
    let users
    try {
      users= await this.MedicSchema.find()
    } catch (error) {
      throw new NotFoundException("erreur lors de la recuperation")
    }
    return users;
  }

 async  findOne(id: string) {
    let user;
    try {
      user= await this.MedicSchema.findById(id)
    } catch (error) {
      throw new NotFoundException('eror')
    }
    return user
  }

 async update(id: string, user) {
    try {
      await this.MedicSchema.updateOne({_id:id},user)
    } catch (error) {
      throw new NotFoundException('eror')
    }
    return true;
  }

  async remove(id: string) {
    try {
      await this.MedicSchema.deleteOne({_id:id})
    } catch (error) {
      throw new NotFoundException('eror')
    }
    return true;
  }
}
