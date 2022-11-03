import { Module } from '@nestjs/common';
import { MedicService } from './medic.service';
import { MedicController } from './medic.controller';

@Module({
  controllers: [MedicController],
  providers: [MedicService]
})
export class MedicModule {}
