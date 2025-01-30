import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolUsuario } from './rol-usuario.entity';
import { RolUsuarioService } from './rol-usuario.service';
import { RolUsuarioController } from './rol-usuario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolUsuario])],
  providers: [RolUsuarioService],
  controllers: [RolUsuarioController],
})
export class RolUsuarioModule {}
