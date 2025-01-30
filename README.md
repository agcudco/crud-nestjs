## Description



## Clonar el proyecto

```bash
# clonar el repositorio
$ https://github.com/agcudco/crud-nestjs.git

# ir al directorio
$ cd crud-nestjs

# instalar dependencias
$ npm install
```

## Pasos iniciales

Crear un nuevo proyecto de nest

```bash
$ npm i -g @nestjs/cli
$ nest new nest-roles-usuarios
$ cd nest-roles-usuarios
```
Instalar dependencias de postgresql

```bash
$ npm install --save @nestjs/typeorm typeorm pg
```
levantar contenedor de la base de datos

```bash
docker-compose up -d
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```