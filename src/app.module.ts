import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol/rol.entity';
import { Usuario } from './usuario/usuario.entity';
import { RolUsuario } from './rol-usurio/rol-usuario.entity';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { RolUsuarioModule } from './rol-usurio/rol-usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'usuarios-bd',
      entities: [Rol, Usuario, RolUsuario],
      synchronize: true, // ¡Solo para desarrollo!
    }),
    RolModule,
    UsuarioModule,
    RolUsuarioModule,
  ],
})
export class AppModule {}
