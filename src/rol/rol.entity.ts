// src/rol/rol.entity.ts
import { Usuario } from '../usuario/usuario.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rol' })
export class Rol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  /**
   * Fecha de creación del registro.
   * Se asigna automáticamente al insertar un nuevo rol.
   */
  @CreateDateColumn()
  creadoEn: Date;

  /**
   * Fecha de la última actualización del registro.
   * Se asigna automáticamente cada vez que se modifica un rol.
   */
  @UpdateDateColumn()
  actualizadoEn: Date;

  @ManyToMany(() => Usuario, (usuario) => usuario.roles)
  @JoinTable({ name: 'usuario_roles' })
  usuarios: Usuario[];
}
