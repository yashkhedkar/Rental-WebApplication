import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { PrismaService } from '../database/database.service';

@Module({
  controllers: [EquipmentController],
  providers: [EquipmentService, PrismaService],
})
export class EquipmentModule {}
