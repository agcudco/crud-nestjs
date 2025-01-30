import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) { }

  findAll(): Promise<Rol[]> {
    return this.rolRepository.find();
  }

  findOne(id: number): Promise<Rol | null> {
    return this.rolRepository.findOne({ where: { id } });
  }

  create(rol: Partial<Rol>): Promise<Rol> {
    const newRol = this.rolRepository.create(rol);
    return this.rolRepository.save(newRol);
  }

  async update(id: number, rol: Partial<Rol>): Promise<Rol | null> {
    await this.rolRepository.update(id, rol);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.rolRepository.delete(id);
  }
}
