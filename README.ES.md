# 🧩 Monorepo: Sistema de Órdenes de Trading (NestJS + Next.js)

Bienvenido al **Sistema de Órdenes de Trading**, una solución full-stack robusta construida como parte de un desafío técnico. Este proyecto demuestra una arquitectura lista para producción, diseñada para escalabilidad, seguridad de tipos y una gestión de datos eficiente.

## 🎙️ El "Speech": ¿Por qué esta Arquitectura?

Al construir aplicaciones web modernas, la elección de las herramientas define el éxito del proyecto. Aquí explicamos por qué elegimos este stack específico:

### 1. ¿Por qué un Monorepo?
Utilizamos una estructura de **monorepo con pnpm** para mantener el backend y el frontend estrechamente acoplados pero físicamente separados. Esto nos permite:
-   **Flujo de Trabajo Unificado**: Gestionar dependencias y ejecutar ambas aplicaciones desde una única raíz.
-   **Estándares Compartidos**: Mantener configuraciones consistentes de linting, formateo y TypeScript en toda la base de código.
-   **Escalabilidad Futura**: Agregar fácilmente paquetes compartidos (como DTOs o funciones de utilidad) que tanto la API como la aplicación Web pueden consumir.

### 2. ¿Por qué NestJS para el Backend?
NestJS fue la elección clara para la API debido a:
-   **Arquitectura Modular**: Impone una separación limpia de responsabilidades mediante Módulos, Controladores y Servicios.
-   **Validaciones Integradas**: Utilizando `class-validator` y `ValidationPipe`, garantizamos que cada dato que ingresa al sistema sea válido según el esquema.
-   **Experiencia de Desarrollo**: Funcionalidades como **Swagger UI** (disponible en `/api/docs`) permiten la exploración y prueba instantánea de la API sin herramientas externas.

### 3. ¿Por qué Next.js para el Frontend?
Para la aplicación web, Next.js proporciona:
-   **Capacidades del Lado del Servidor**: Mediante **Server Actions** y **Server Components**, reducimos la cantidad de JavaScript enviado al cliente manteniendo un flujo de datos seguro.
-   **Localización**: Integrado con `next-intl` para soportar múltiples idiomas de forma fluida (Español/Inglés).
-   **Diseño Moderno**: Construido con **DaisyUI** y **Tailwind CSS**, ofreciendo una estética premium de glassmorphism y diseño responsivo.

---

## 🚀 Características Principales

-   **Validaciones de Trading Complejas**: Lógica estricta para órdenes **Limit**, **Market** y **Stop** basada en precios de mercado en tiempo real (BTCUSD, EURUSD, ETHUSD).
-   **Sistema de Soft Delete (Borrado Lógico)**: Las órdenes nunca se pierden realmente. Se marcan como eliminadas pero permanecen en la base de datos para auditoría, visibles en la interfaz con una etiqueta especial.
-   **Paginación Avanzada**: Obtención de datos eficiente con paginación en el servidor para manejar miles de órdenes sin afectar el rendimiento.
-   **Docs de API Interactivos**: API REST totalmente documentada usando Swagger.
-   **Pruebas Unitarias**: La lógica de negocio central (validaciones) está respaldada por pruebas unitarias con Jest.

---

## 📁 Estructura del Proyecto

```text
/
├── apps/
│   ├── api/        # NestJS (Backend) - Puerto 4000
│   └── web/        # Next.js (Frontend) - Puerto 3000
├── packages/
│   └── shared/     # (Placeholder para futura lógica compartida)
├── package.json    # Scripts de la raíz
└── README.md       # Documentación en Inglés
└── README.ES.md    # Documentación en Español
```

## ⚙️ Instalación y Configuración

### Requisitos
-   Node.js 20+
-   pnpm v8+
-   Base de datos MySQL

### Pasos
1.  **Clonar e Instalar**:
    ```bash
    git clone <repo-url>
    cd challenge-trading-order
    pnpm install
    ```
2.  **Variables de Entorno**:
    Configurar el archivo `.env` en `apps/api` con tus credenciales de MySQL (DB_HOST, DB_NAME, DB_USER, DB_PASS).
3.  **Ejecutar Desarrollo**:
    ```bash
    pnpm dev
    ```

---

## 🕹️ Uso

-   **Frontend**: [http://localhost:3000](http://localhost:3000)
-   **Documentación de API (Swagger)**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## 🧑‍🚀 Autor

**Max Shtefec**
*Software Architect / Full Stack Developer*
-   [GitHub](https://github.com/maxshdev)
-   [LinkedIn](https://linkedin.com/in/maxshtefec)
