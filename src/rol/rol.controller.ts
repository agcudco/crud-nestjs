import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RolService } from './rol.service';
import { Rol } from './rol.entity';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  /**
   * Obtiene todos los roles.
   */
  @Get()
  async findAll(): Promise<Rol[]> {
    return await this.rolService.findAll();
  }

  /**
   * Obtiene un rol por su ID.
   * @param id Número identificador del rol.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Rol> {
    return await this.rolService.findOne(id);
  }

  /**
   * Crea un nuevo rol.
   * @param data Datos del rol a crear.
   */
  @Post()
  async create(@Body() data: Partial<Rol>): Promise<Rol> {
    return await this.rolService.create(data);
  }

  /**
   * Actualiza un rol existente.
   * @param id Número identificador del rol.
   * @param changes Cambios a aplicar.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: Partial<Rol>,
  ): Promise<Rol> {
    return await this.rolService.update(id, changes);
  }

  /**
   * Elimina un rol por su ID.
   * @param id Número identificador del rol.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.rolService.remove(id);
  }
}
