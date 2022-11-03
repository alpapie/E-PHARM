import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private UserModel:Model<User>){}

 async create(user) {
  let newUser ;
    try{
      newUser= await new this.UserModel(user);
    await  newUser.save();
    }catch(error){
      throw new NotFoundException("erreur lors de l'enregistrement")
    }
    return `Nouveaux user creer avec success ${newUser.id}`;
  }

  async findAll() {
    let users;
    try{
      users= await this.UserModel.find()
    }catch(error){
      throw new NotFoundException("erreur lors de la recuperation des users")
    }
    return users;
  }

 async findOne(id: string) {
    let user;
    try{
      user= await this.UserModel.findById(id)
    }catch(error){
      throw new NotFoundException("erreur lors de la recuperation de l'utilisateur")
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

 async  remove(id: string) {
    let userToDelete;
    try {
      userToDelete= await this.UserModel.deleteOne({_id:id})
    } catch (error) {
      throw new NotFoundException('erreur lors de la supression')
    }
    if(userToDelete.deletedCount==0) return "aucunn user trouver"
    return `user avec id ${id} suprimer avec success`;
  }
}
