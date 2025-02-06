import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Rol } from '../rol/rol.entity';

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
   */
  async create(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(data);
    return await this.usuarioRepository.save(usuario);
  }

  /**
   * Actualiza un usuario existente.
   */
  async update(id: number, changes: Partial<Usuario>): Promise<Usuario> {
    await this.usuarioRepository.update(id, changes);
    return this.findOne(id);
  }

  /**
   * Elimina un usuario por su ID.
   */
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  /**
   * Asigna un rol a un usuario.
   */
  async assignRole(userId: number, roleId: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no existe`);
    }

    const role = await this.rolRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Rol con id ${roleId} no existe`);
    }

    // Si el rol ya está asignado, se retorna el usuario sin cambios.
    if (user.roles.find((r) => r.id === role.id)) {
      return user;
    }

    user.roles.push(role);
    return await this.usuarioRepository.save(user);
  }

  /**
   * Remueve un rol de un usuario.
   */
  async removeRole(userId: number, roleId: number): Promise<Usuario> {
    const user = await this.usuarioRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${userId} no existe`);
    }

    const role = await this.rolRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException(`Rol con id ${roleId} no existe`);
    }

    user.roles = user.roles.filter((r) => r.id !== role.id);
    return await this.usuarioRepository.save(user);
  }
}
