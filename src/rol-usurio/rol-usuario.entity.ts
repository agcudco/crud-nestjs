import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rol_usuario' })
export class RolUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rolId: number;

  @Column()
  usuarioId: number;
}
