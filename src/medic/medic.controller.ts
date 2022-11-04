import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MedicService } from './medic.service';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('medic')
export class MedicController {
  constructor(private readonly medicService: MedicService) {}
  validateFile(file, medic){
    //on verify le size et le type du fichier
    const allowedExtensions = ['jpeg', 'jpg', 'png'];
    const size=20*1024*1000
    //on recupere la dernier valeur
    const extension = file.originalname.split('.').pop()
    if(allowedExtensions.includes(extension) && file.size<size){
        //on enregistre le fichier
        medic.image = file.filename;
        return medic
    }else{
      return null
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
 async  create(@UploadedFile() file, @Body() medic,  @Res() res: Response) {
    if(file) {
      medic= this.validateFile(file,medic)
    }
    await this.medicService.create(medic)
    return res.redirect('/medic');
  }

  @Get()
  async findAll(  @Res() res: Response) {
    let medics= await this.medicService.findAll()
    return res.render('medicaments',{medics});
  }

  @Get('about/medic/get/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
   let medic= await this.medicService.findOne(id);
   console.log(medic)
    return res.render('aboutmedic',{medic})
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('file'))
 async update(@UploadedFile() file,@Param('id') id: string, @Body() medic, @Res() res: Response) {
  if(file) {
    medic= this.validateFile(file,medic)
  }
   await this.medicService.update(id, medic);
    return res.redirect('/medic')
  }

  @Get('delete/:id')
 async remove(@Param('id') id: string, @Res() res: Response) {
    await this.medicService.remove(id);
    return res.redirect('/medic')
  }
}
