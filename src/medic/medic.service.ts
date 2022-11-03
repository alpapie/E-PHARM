import { Injectable } from '@nestjs/common';
import { CreateMedicDto } from './dto/create-medic.dto';
import { UpdateMedicDto } from './dto/update-medic.dto';

@Injectable()
export class MedicService {
  create(createMedicDto: CreateMedicDto) {
    return 'This action adds a new medic';
  }

  findAll() {
    return `This action returns all medic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medic`;
  }

  update(id: number, updateMedicDto: UpdateMedicDto) {
    return `This action updates a #${id} medic`;
  }

  remove(id: number) {
    return `This action removes a #${id} medic`;
  }
}
