# TechStock Pro — Front-end (Entrega)

Proyecto estático: interfaz para la gestión de insumos y stock, publicada con GitHub Pages.

Live demo

https://nikohgb.github.io/techstock-pro-sumativa-3-front-end/

Descripción general

TechStock Pro es una interfaz ligera para administrar insumos de una bodega tecnológica. Permite añadir, editar y eliminar insumos, controlar stock y precios, y ver estadísticas sencillas en la cabecera. La versión actual es completamente estática y guarda datos en el navegador usando `localStorage`.

Características principales

- Añadir insumos: nombre, descripción, categoría, stock y precio.
- Editar insumos existentes directamente desde la interfaz.
- Eliminar insumos con confirmación.
- Conteo dinámico de insumos y total de stock mostrado en la cabecera.
- Persistencia local: todos los cambios se guardan en `localStorage` del navegador.
- Restablecer datos de ejemplo desde la UI.

Limitaciones

- Los datos se guardan solo en el navegador (no sincronizados entre dispositivos).
- Para compartir datos entre usuarios es necesario conectar la aplicación a un backend o usar un servicio (Firebase, etc.).

Cómo usar (rápido)

1. Abre la demo en: https://nikohgb.github.io/techstock-pro-sumativa-3-front-end/
2. En el formulario izquierdo, completa los campos y pulsa "Agregar insumo".
3. Los insumos aparecen en la lista a la derecha; usa "Editar" o "Eliminar" para modificarlos.
4. El conteo de insumos y el total de stock se actualizan automáticamente.

Ver el proyecto localmente

```powershell
cd "C:\Users\elsar\Downloads\front end prueba 3 nicolas"
# Abrir directamente el archivo HTML en el navegador o usar un servidor estático
start index.html
# (Opcional) si usas Node.js + http-server:
# npm install -g http-server
# http-server -c-1 .
```

Despliegue

- El sitio está publicado en GitHub Pages desde la rama `main` (raíz del repo). Si haces cambios, haz commit y `git push` para que se despliegue automáticamente.

Tecnologías

- HTML, CSS, JavaScript (vanilla)
- Bootstrap 5 (CDN)
- GitHub Pages (hosting)

Siguientes mejoras sugeridas

- Conectar a un backend (Node/Firebase) para persistencia multiusuario.
- Añadir búsqueda y filtros para la lista de insumos.
- Exportar/importar CSV para respaldo de datos.

Autor

`nikohgb` — nicolas.alvares65@inacapmail.cl

Si quieres, actualizo también el apartado *About* del repositorio (descripción y URL pública). Dime si lo hago ahora.

Estructura principal:
```
front end prueba 3 nicolas/
├── public/            # recursos públicos (si aplica)
├── src/               # código fuente React (JSX, CSS)
├── docs/              # documentación adicional
├── PROMPTS.md         # notas o prompts del proyecto
└── index.html         # página de entrada (publicada en GitHub Pages)
```

Cómo ver la página publicada:

1. Abre la URL pública (puede tardar 1–2 minutos en activarse la primera vez):

   https://nikohgb.github.io/techstock-pro-sumativa-3-front-end/

2. Si la URL muestra 404 o no carga:

   - Entra a tu repositorio → **Actions** y busca la ejecución "pages build and deployment".
   - Abre la ejecución y revisa los **logs** para ver el error. Copia aquí el mensaje si quieres ayuda para solucionarlo.

Solución rápida a problemas comunes de GitHub Pages:

- Asegúrate de que `index.html` esté en la raíz del repo (ya está renombrado).
- Si la build falla por dependencias (proyectos con build), añade un `build` script en `package.json` o desactiva builds automatizados si la página es estática.
- `.nojekyll` ya existe en el repo para evitar que Jekyll procese la página.

Funcionalidades principales (versión actual):

- Añadir insumos con: nombre, descripción, categoría, stock y precio.
- Editar insumos existentes.
- Eliminar insumos.
- Conteo dinámico de insumos y total de stock mostrado en la cabecera.
- Persistencia local en el navegador usando `localStorage`.

Limitaciones y siguientes pasos recomendados:

- Actualmente los datos se guardan solo en `localStorage` del navegador. Si quieres que varios usuarios compartan datos, puedo conectar la app a una API o a Firebase.
- Puedo añadir validaciones más estrictas, filtros y export/import CSV si lo necesitas.

Comandos útiles (local):

```powershell
cd "C:\Users\elsar\Downloads\front end prueba 3 nicolas"
git status
git pull
git add .
git commit -m "Update README and Pages info"
git push
```

Si quieres, puedo:

- Actualizar el apartado *About* del repositorio para mostrar la descripción y la URL pública.
- Añadir capturas o un GIF de uso al `README`.
- Conectar la app a un backend para guardar insumos en la nube.

Dime qué prefieres y lo hago ahora.
