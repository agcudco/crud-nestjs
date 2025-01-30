import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuario|null> {
    return this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Usuario>): Promise<Usuario|null> {
    return this.usuarioService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
