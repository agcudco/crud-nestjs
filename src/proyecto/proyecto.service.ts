import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './proyecto.entity';
import { Tarea } from '../tarea/tarea.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly repositorioProyecto: Repository<Proyecto>,
    @InjectRepository(Tarea)
    private readonly repositorioTarea: Repository<Tarea>,
  ) {}

  async obtenerTodos(): Promise<Proyecto[]> {
    return await this.repositorioProyecto.find({ relations: ['tareas'] });
  }

  async obtenerUno(id: number): Promise<Proyecto> {
    const proyecto = await this.repositorioProyecto.findOne({
      where: { id },
      relations: ['tareas'],
    });
    if (!proyecto) {
      throw new NotFoundException(`Proyecto con id ${id} no encontrado`);
    }
    return proyecto;
  }

  async crear(datosProyecto: Partial<Proyecto>): Promise<Proyecto> {
    const proyecto = this.repositorioProyecto.create(datosProyecto);
    return await this.repositorioProyecto.save(proyecto);
  }

  async actualizar(id: number, datosProyecto: Partial<Proyecto>): Promise<Proyecto> {
    await this.repositorioProyecto.update(id, datosProyecto);
    return this.obtenerUno(id);
  }

  async eliminar(id: number): Promise<void> {
    const proyecto = await this.obtenerUno(id);
    await this.repositorioProyecto.remove(proyecto);
  }

  /**
   * Agrega una tarea a un proyecto.
   * @param idProyecto ID del proyecto
   * @param datosTarea Datos de la tarea a agregar
   * @returns Proyecto actualizado con la nueva tarea
   */
  async agregarTarea(idProyecto: number, datosTarea: Partial<Tarea>): Promise<Proyecto> {
    const proyecto = await this.obtenerUno(idProyecto);
    const tarea = this.repositorioTarea.create(datosTarea);
    tarea.proyecto = proyecto;
    await this.repositorioTarea.save(tarea);
    return this.obtenerUno(idProyecto);
  }
}
