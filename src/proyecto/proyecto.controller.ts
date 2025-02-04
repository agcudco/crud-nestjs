import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Get()
  async obtenerTodos(): Promise<Proyecto[]> {
    return await this.proyectoService.obtenerTodos();
  }

  @Get(':id')
  async obtenerUno(@Param('id', ParseIntPipe) id: number): Promise<Proyecto> {
    return await this.proyectoService.obtenerUno(id);
  }

  @Post()
  async crear(@Body() datosProyecto: Partial<Proyecto>): Promise<Proyecto> {
    return await this.proyectoService.crear(datosProyecto);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosProyecto: Partial<Proyecto>,
  ): Promise<Proyecto> {
    return await this.proyectoService.actualizar(id, datosProyecto);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.proyectoService.eliminar(id);
  }

  /**
   * Endpoint para agregar una tarea a un proyecto.
   * Ejemplo: POST /proyectos/1/tareas
   */
  @Post(':id/tareas')
  async agregarTarea(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosTarea: Partial<any>, // Puedes definir un DTO para mayor precisión
  ): Promise<Proyecto> {
    return await this.proyectoService.agregarTarea(id, datosTarea);
  }
}
