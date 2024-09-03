# Proyecto VML - Instrucciones de Instalación y Ejecución

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (generalmente se instala junto con Node.js)
- Un editor de texto o IDE (recomendado: [Visual Studio Code](https://code.visualstudio.com/))

## Paso 1: Clonar el Repositorio

Primero, clona el repositorio de este proyecto en tu máquina local. Abre tu terminal o línea de comandos y ejecuta el siguiente comando:

#### Via SSH
```bash
git clone git@github.com:VML-Development-Repository/VML.ChatBot.Designer.git
```

### Via HTTP
```bash
git clone https://github.com/VML-Development-Repository/VML.ChatBot.Designer.git
```

## Paso 2: Navegar al Directorio del Proyecto
Una vez clonado el repositorio, navega al directorio del proyecto. Ejecuta el siguiente comando en la terminal:

```bash
cd VML.ChatBot.Designer
```

## Paso 3: Instalar Dependencias
Para instalar todas las dependencias necesarias, ejecuta el siguiente comando en la terminal:

```bash
npm install
```

Esto descargará e instalará todos los paquetes listados en el archivo package.json.

## Paso 4: Ejecutar el Frontend
Para ejecutar la aplicación frontend, utiliza el siguiente comando:

```bash
npm run startWin
```

Este comando iniciará el servidor de desarrollo del frontend. Asegúrate de que la terminal permanezca abierta mientras trabajas con la aplicación frontend.

## Paso 5: Ejecutar el Backend
En una nueva terminal o ventana de línea de comandos, navega nuevamente al directorio del proyecto si no lo has hecho ya, y luego ejecuta:

```bash
npm run startBack
```

Este comando iniciará el servidor backend de la aplicación. Al igual que con el frontend, asegúrate de que la terminal permanezca abierta mientras trabajas con la aplicación backend.

## Notas Adicionales
Si estás utilizando un entorno de desarrollo como Visual Studio Code, puedes abrir el terminal integrado y seguir los pasos anteriores dentro del propio editor.
Si necesitas detener el frontend o el backend, puedes hacerlo presionando Ctrl + C en la terminal donde se está ejecutando el proceso.
