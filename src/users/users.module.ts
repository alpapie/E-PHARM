import { UserSchema } from './entities/user.entity';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports:[MongooseModule.forFeature([{name:'user', schema: UserSchema}])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
