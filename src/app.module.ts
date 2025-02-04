import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TareaModule } from './tarea/tarea.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'usuarios-bd',
      //entities: [Rol, Usuario],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // ¡Solo para desarrollo!
    }),
    RolModule,
    UsuarioModule,
    ProyectoModule,
    TareaModule
  ],
})
export class AppModule {}
