import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { Tarea } from './tarea.entity';

@Controller('tareas')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Get()
  async obtenerTodos(): Promise<Tarea[]> {
    return await this.tareaService.obtenerTodos();
  }

  @Get(':id')
  async obtenerUno(@Param('id', ParseIntPipe) id: number): Promise<Tarea> {
    return await this.tareaService.obtenerUno(id);
  }

  @Post()
  async crear(@Body() datosTarea: Partial<Tarea>): Promise<Tarea> {
    return await this.tareaService.crear(datosTarea);
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() datosTarea: Partial<Tarea>,
  ): Promise<Tarea> {
    return await this.tareaService.actualizar(id, datosTarea);
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.tareaService.eliminar(id);
  }
}
