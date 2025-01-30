import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('roles')
export class RolController {

  constructor(private readonly rolService: RolService) { }

  @Get()
  async findAll(): Promise<Rol[]> {
    return this.rolService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Rol | null> {
    return this.rolService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Rol>): Promise<Rol> {
    return this.rolService.create(data);
  }


  /**
   * PUT /roles/:id
   * Actualiza un rol existente.
   */
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Rol>): Promise<Rol | null> {
    return this.rolService.update(id, data);
  }


  /**
     * DELETE /roles/:id
     * Elimina un rol por su ID.
     */
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.rolService.delete(id);
  }
}
