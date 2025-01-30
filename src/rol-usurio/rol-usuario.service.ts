import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolUsuario } from './rol-usuario.entity';

@Injectable()
export class RolUsuarioService {
  constructor(
    @InjectRepository(RolUsuario)
    private readonly rolUsuarioRepository: Repository<RolUsuario>,
  ) {}

  findAll(): Promise<RolUsuario[]> {
    return this.rolUsuarioRepository.find();
  }

  findOne(id: number): Promise<RolUsuario|null> {
    return this.rolUsuarioRepository.findOne({ where: { id } });
  }

  create(rolUsuario: Partial<RolUsuario>): Promise<RolUsuario> {
    const newRolUsuario = this.rolUsuarioRepository.create(rolUsuario);
    return this.rolUsuarioRepository.save(newRolUsuario);
  }

  async update(id: number, rolUsuario: Partial<RolUsuario>): Promise<RolUsuario|null> {
    await this.rolUsuarioRepository.update(id, rolUsuario);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.rolUsuarioRepository.delete(id);
  }
}
