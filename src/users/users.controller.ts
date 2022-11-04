import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import * as bcrypt from "bcrypt"
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  validateFile(file, user){
    //on verify le size et le type du fichier
    const allowedExtensions = ['jpeg', 'jpg', 'png'];
    const size=20*1024*1000
    //on recupere la dernier valeur
    const extension = file.originalname.split('.').pop()
    if(allowedExtensions.includes(extension) && file.size<size){
        //on enregistre le fichier
        user.avatar = file.filename;
        return user
    }else{
      return null
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file,@Body() user, @Res() res: Response) {
    if(file){
      user=this.validateFile(file, user)
    }
    user.password= await bcrypt.hash(user.password,10);
    await this.usersService.create(user);
    return res.redirect('/users')
  }

  @Get()
 async findAll(@Req() req: Request,@Res() res: Response) {
    //get cookies
    // let cookies = req.rawHeaders['usersession']
    //to json a 

    let user= req.headers['cookie']
  
   const users= await this.usersService.findAll(); 
    // console.log(users)  
    return res.render('index',{users}) 
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('file'))
 async  update(@UploadedFile() file,@Param('id') id: string, @Body() user, @Res() res: Response) {
    // console.log(user)
    if(file){
      user=this.validateFile(file,user)
    }
    await this.usersService.update(id, user)

    return res.redirect('/users');
  }

  @Get('delete/:id')
 async remove(@Param('id') id: string, @Res() res: Response) {
   await this.usersService.remove(id);
    return res.redirect('/users')
  }
  @Post('login')
  async login(@Body() user, @Res() res: Response){
    let data= await this.usersService.login(user)
    if(!data){
     return res.render('login',{error:"email ou mot de passe incorrect"})
    }
    res.cookie('usersession',data)
    // console.log(res)
    return res.redirect('/users')
  }

  @Get('/add/newusers')
  @Render('adduser')
  adduser(){
 return {}
  }
}
