import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RolUsuarioService } from './rol-usuario.service';
import { RolUsuario } from './rol-usuario.entity';

@Controller('roles-usuarios')
export class RolUsuarioController {
  constructor(private readonly rolUsuarioService: RolUsuarioService) {}

  @Get()
  async findAll(): Promise<RolUsuario[]> {
    return this.rolUsuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<RolUsuario|null> {
    return this.rolUsuarioService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<RolUsuario>): Promise<RolUsuario> {
    return this.rolUsuarioService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<RolUsuario>): Promise<RolUsuario|null> {
    return this.rolUsuarioService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.rolUsuarioService.delete(id);
  }
}
