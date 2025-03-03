// src/rol/rol.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  /**
   * Retorna todos los roles con sus usuarios relacionados.
   */
  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find({ relations: ['usuarios'] });
  }

  /**
   * Retorna un rol por su ID.
   */
  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolRepository.findOne({
      where: { id },
      relations: ['usuarios'],
    });
    if (!rol) {
      throw new NotFoundException(`El rol con id ${id} no existe`);
    }
    return rol;
  }

  /**
   * Crea un nuevo rol.
   */
  async create(data: Partial<Rol>): Promise<Rol> {
    const rol = this.rolRepository.create(data);
    return await this.rolRepository.save(rol);
  }

  /**
   * Actualiza un rol existente.
   */
  async update(id: number, changes: Partial<Rol>): Promise<Rol> {
    await this.rolRepository.update(id, changes);
    return this.findOne(id);
  }

  /**
   * Elimina un rol por su ID.
   */
  async remove(id: number): Promise<void> {
    const rol = await this.findOne(id);
    await this.rolRepository.remove(rol);
  }
}
