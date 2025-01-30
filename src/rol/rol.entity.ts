import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
}
