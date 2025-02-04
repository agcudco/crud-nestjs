import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly repositorioTarea: Repository<Tarea>,
  ) {}

  async obtenerTodos(): Promise<Tarea[]> {
    return await this.repositorioTarea.find({ relations: ['proyecto'] });
  }

  async obtenerUno(id: number): Promise<Tarea> {
    const tarea = await this.repositorioTarea.findOne({
      where: { id },
      relations: ['proyecto'],
    });
    if (!tarea) {
      throw new NotFoundException(`Tarea con id ${id} no encontrada`);
    }
    return tarea;
  }

  async crear(datosTarea: Partial<Tarea>): Promise<Tarea> {
    const tarea = this.repositorioTarea.create(datosTarea);
    return await this.repositorioTarea.save(tarea);
  }

  async actualizar(id: number, datosTarea: Partial<Tarea>): Promise<Tarea> {
    await this.repositorioTarea.update(id, datosTarea);
    return this.obtenerUno(id);
  }

  async eliminar(id: number): Promise<void> {
    const tarea = await this.obtenerUno(id);
    await this.repositorioTarea.remove(tarea);
  }
}
