# Tutorías ITA

## ¿Qué es “Formularios Tutorías”?
**Contexto**: Hay escuelas en México que tienen un sistema de tutorías internas, que sirve para tener un contexto social, familiar y escolar de cada estudiante de nuevo ingreso y de esta forma abordar cualquier dificultad con el contexto requerido. 

**Problema**: La cantidad de estudiantes es tan grande que el proceso se hace lento e ineficiente, gastando grandes cantidades de papel.

**Solución**: “Formularios Tutorías” se presenta como la alternativa digital a este problema, de forma que se pueda crear una conexión más eficiente entre alumnos, tutores y personal administrativo, contando con una bien diseñada base de datos de forma que los formularios de las tutorías puedan ser llenados ágilmente. 

![Captura del proyecto](public/TecNM_assets/capturareadme.png)

📥 **[Descarga el PowerPoint de la guía rápida de Tutorías](public/assets/Formularios%20Tutorías%20(Guia%20rapida).pptx)**

Tutorías ITA es un sistema web para la gestión de tutorías, desarrollado con **Laravel**, **React** e **Inertia.js**. 

## 🚀 Enlace en Producción (Deploy)
Puedes ver el proyecto funcionando en vivo en el siguiente enlace:
[https://tutoriasita-production.up.railway.app/](https://tutoriasita-production.up.railway.app/)

## ✨ Características del Proyecto
* **Gestión de Roles:** Administración de usuarios, Tutores y Alumnos.
* **Formularios Dinámicos:** Creación y seguimiento de formularios, preguntas y respuestas para los alumnos.
* **Registro de Reuniones (Tutorías):** Seguimiento y calendarización de reuniones entre tutores y alumnos.
* **SPA (Single Page Application):** Experiencia de usuario dinámica y fluida gracias a la integración React + Inertia.js.

## 🛠️ Requisitos Previos
Asegúrate de tener instalado en tu sistema:
* PHP (>= 8.2)
* Composer
* Node.js y npm
* Un gestor de Base de Datos (MySQL, MariaDB o SQLite). Puedes gestionar tu base de datos mediante interfaces como **phpMyAdmin**. *(Recomendación: Para usuarios de Windows, usar **WampServer (WAMP)** facilita mucho la instalación de PHP, MySQL y phpMyAdmin en un solo paquete).*

## 💻 Pasos para ejecutarlo localmente

1. **Clonar el repositorio o ubicarte en la carpeta del proyecto:**
   ```bash
   cd TutoriasITA
   ```

2. **Instalar dependencias de PHP:**
   ```bash
   composer install
   ```

3. **Instalar dependencias de Node/JavaScript:**
   ```bash
   npm install
   ```

4. **Configurar el entorno:**
   Duplica el archivo `.env.example` y renómbralo a `.env` (si usas Windows PowerShell puedes copiarlo con `copy .env.example .env`).
   Asegúrate de configurar las credenciales de tu base de datos en el archivo `.env` para que correspondan con tu entorno local:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=tutoriasita
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Generar la clave de la aplicación:**
   ```bash
   php artisan key:generate
   ```

6. **Ejecutar migraciones y seeders:**
   Para crear las tablas de la base de datos y agregar información inicial (usuarios, carreras, etc):
   ```bash
   php artisan migrate --seed
   ```

7. **Iniciar los servidores de desarrollo:**
   Necesitas ejecutar los dos siguientes comandos, preferiblemente en terminales separadas.
   
   Para compilar y observar cambios en el frontend de React/Vite:
   ```bash
   npm run dev
   ```

   Para levantar el servidor backend de Laravel:
   ```bash
   php artisan serve
   ```

8. **Visualizar la aplicación:**
   Finalmente, abre tu navegador web y visita la dirección [http://localhost:8000](http://localhost:8000).