import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as mysql from 'mysql2/promise'; // Conexión directa
import { GlobalExceptionFilter } from './common/filters/http-exception.filter';


async function createDatabaseIfNotExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await connection.end();
  console.log('✅ Base de datos verificada o creada');
}

async function bootstrap() {
  await createDatabaseIfNotExists();

  const app = await NestFactory.create(AppModule);

  // -------------------------------------------------------------
  // 🌐 Prefijo global /api
  // -------------------------------------------------------------
  app.setGlobalPrefix('api');

  // 🔥 Aplica el filtro global
  app.useGlobalFilters(new GlobalExceptionFilter());

  // -------------------------------------------------------------
  // 📘 Swagger Config
  // -------------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('E-Learning API')
    .setDescription('API documentation for the E-Learning platform')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // 🔒 Mantiene el token cargado al refrescar
    },
  });

  // -------------------------------------------------------------
  // 🌍 CORS Config
  // -------------------------------------------------------------
  const allowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000',
    'http://localhost:4000',  // 👈 Swagger local
    'https://localhost:4000', // 👈 Swagger con https (si aplica)
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Swagger UI no envía "origin" -> permitirlo igual
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`🚫 CORS bloqueado para: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  // -------------------------------------------------------------
  // 🧩 Global pipes
  // -------------------------------------------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );


  // -------------------------------------------------------------
  // 🚀 Arrancar servidor
  // -------------------------------------------------------------
  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 Servidor iniciado en http://localhost:${port}`);
  console.log(`📘 Swagger en http://localhost:${port}/api/docs`);
}

bootstrap();
