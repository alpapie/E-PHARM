import { UserSchema } from './entities/user.entity';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { diskStorage } from 'multer';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports:[MongooseModule.forFeature([{name:'user', schema: UserSchema}]),MulterModule.register({
    storage:diskStorage({
      destination: './public/assets/images',
      filename: (req, file, cb) => {
        //chance file name :
        cb(null, file.originalname.split('.')[0] + '_' + Date.now() 
        +'.'+ file.originalname.split('.').pop())
      }
    })
  })],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
