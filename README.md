# TechStock Pro — Prueba de entrega
Proyecto estático de la entrega — interfaz de la aplicación "TechStock Pro".

Descripción:
- Este repositorio contiene la versión estática del front-end del proyecto "TechStock Pro".
- La página principal está en `index.html` en la raíz del repositorio (publicada vía GitHub Pages).

Live demo:

https://nikohgb.github.io/techstock-pro-sumativa-3-front-end/

Resumen rápido:
- TechStock Pro es una interfaz para gestionar "insumos" (añadir, editar, eliminar, controlar stock y precio).
- La versión publicada usa solo HTML/CSS/JS y almacena los datos en `localStorage` del navegador (no requiere backend).

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
