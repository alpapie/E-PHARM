import { Module } from '@nestjs/common';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {MedicSchema} from './entities/medic.entity'
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
@Module({
  imports:[MongooseModule.forFeature([{name:'medic',schema:MedicSchema}]),
  MulterModule.register({
    storage:diskStorage({
      destination: './public/assets/images',
      filename: (req, file, cb) => {
        //chance file name :
        cb(null, file.originalname.split('.')[0] + '_' + Date.now() 
        +'.'+ file.originalname.split('.').pop())
      }
    })
  })],
  controllers: [MedicController],
  providers: [MedicService]
})
export class MedicModule {}
