# TechStock Pro — Prueba de entrega
Proyecto estático de la entrega — interfaz de la aplicación "TechStock Pro".

Descripción:
- Este repositorio contiene la versión estática del front-end del proyecto "TechStock Pro".
- La página principal está en `index.html` en la raíz del repositorio (publicada vía GitHub Pages).

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
- Revisar los logs de Actions y corregir el error concreto.
- Añadir una sección con instrucciones de uso o capturas al `README`.
- Configurar un `CNAME` si quieres dominio personalizado.

Dime qué prefieres y lo hago ahora.
