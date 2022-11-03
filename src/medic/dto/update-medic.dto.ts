import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicDto } from './create-medic.dto';

export class UpdateMedicDto extends PartialType(CreateMedicDto) {}
