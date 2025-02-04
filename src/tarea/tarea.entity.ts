import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Proyecto } from '../proyecto/proyecto.entity';

@Entity({ name: 'tareas' })
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ default: 'pendiente' })
  estado: string;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @ManyToOne(() => Proyecto, proyecto => proyecto.tareas, { onDelete: 'CASCADE' })
  proyecto: Proyecto;
}
