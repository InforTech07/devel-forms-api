# Proyecto de API devels-forms

## Requisitos

- Docker
- Node.js
- npm v18.19.0

## Pasos para levantar el proyecto

1. **Levantar la base de datos desde Docker**:
   ```bash
   docker-compose up
   ```

2. **Instalar las dependencias de Node.js**:
   ```bash
   npm install
   ```

3. **Crear un archivo `.env`**:
   - Crea un archivo `.env` en la raíz del proyecto con los siguientes datos:
     ```env
     API_KEY=jk2l13123
     DATABASE_NAME=develformsdb
     DATABASE_PORT=1433
     DATABASE_USER=sa
     DATABASE_PASSWORD=yourStrong!Password
     JWT_SECRET=!@secret
     ```

4. **Ejecutar el proyecto en modo desarrollo**:
   ```bash
   npm run start:dev
   ```

## Descripción del Proyecto

Este proyecto es una API desarrollada con NestJS. Sigue los pasos anteriores para configurar y ejecutar el proyecto en tu entorno local.

## Contacto

krick07@hotmail.com