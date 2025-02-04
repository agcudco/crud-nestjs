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
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  /**
   * Obtiene todos los usuarios.
   */
  @Get()
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }

  /**
   * Obtiene un usuario por su ID.
   * @param id Número identificador del usuario.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuarioService.findOne(id);
  }

  /**
   * Crea un nuevo usuario.
   * @param data Datos del usuario a crear.
   */
  @Post()
  async create(@Body() data: Partial<Usuario>): Promise<Usuario> {
    return await this.usuarioService.create(data);
  }

  /**
   * Actualiza un usuario existente.
   * @param id Número identificador del usuario.
   * @param changes Cambios a aplicar.
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: Partial<Usuario>,
  ): Promise<Usuario> {
    return await this.usuarioService.update(id, changes);
  }

  /**
   * Elimina un usuario por su ID.
   * @param id Número identificador del usuario.
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.usuarioService.remove(id);
  }

  // Endpoints para asignar y remover roles

  /**
   * Asigna un rol a un usuario.
   * Ejemplo de llamada: POST /usuario/1/roles/2
   */
  @Post(':userId/roles/:roleId')
  async assignRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<Usuario> {
    return await this.usuarioService.assignRole(userId, roleId);
  }

  /**
   * Remueve un rol de un usuario.
   * Ejemplo de llamada: DELETE /usuario/1/roles/2
   */
  @Delete(':userId/roles/:roleId')
  async removeRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<Usuario> {
    return await this.usuarioService.removeRole(userId, roleId);
  }
}
