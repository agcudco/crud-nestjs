import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from 'src/rol/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  /**
   * Retorna todos los usuarios con sus roles relacionados.
   */
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({ relations: ['roles'] });
  }

  /**
   * Retorna un usuario por su ID.
   * @param id - Identificador del usuario a buscar.
   * @throws NotFoundException si no se encuentra el usuario.
   */
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
    if (!usuario) {
      throw new NotFoundException(`El usuario con id ${id} no existe`);
    }
    return usuario;
  }

  /**
   * Crea un nuevo usuario.
   * @param data - Datos del usuario a crear.
   */
  async create(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  /**
   * Actualiza un usuario existente.
   * @param id - Identificador del usuario a actualizar.
   * @param changes - Cambios a aplicar.
   */
  async update(id: number, changes: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, changes);
    return this.findOne(id);
  }

  /**
   * Elimina un usuario por su ID.
   * @param id - Identificador del usuario a eliminar.
   */
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

   /**
   * Asigna un rol a un usuario.
   * @param userId - ID del usuario.
   * @param roleId - ID del rol a asignar.
   * @returns El usuario actualizado con la nueva asignación.
   * @throws NotFoundException si el usuario o rol no existen.
   */
   async assignRole(userId: number, roleId: number): Promise<Usuario> {
    // Obtiene el usuario incluyendo la relación de roles
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no existe`);
    }

    // Obtiene el rol a asignar
    const role = await this.rolRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Rol con id ${roleId} no existe`);
    }

    // Si el rol ya está asignado, se retorna el usuario sin cambios
    if (user.roles.find((r) => r.id === role.id)) {
      return user;
    }

    // Asigna el rol al usuario y lo guarda en la base de datos
    user.roles.push(role);
    return await this.usuarioRepository.save(user);
  }

  /**
   * Remueve un rol de un usuario.
   * @param userId - ID del usuario.
   * @param roleId - ID del rol a remover.
   * @returns El usuario actualizado sin el rol removido.
   * @throws NotFoundException si el usuario o rol no existen.
   */
  async removeRole(userId: number, roleId: number): Promise<Usuario> {
    // Obtiene el usuario incluyendo la relación de roles
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no existe`);
    }

    // Obtiene el rol a remover
    const role = await this.rolRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Rol con id ${roleId} no existe`);
    }

    // Remueve el rol filtrando la lista de roles asignados
    user.roles = user.roles.filter((r) => r.id !== role.id);
    return await this.usuarioRepository.save(user);
  }
}
