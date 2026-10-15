# Del Norte Propiedades

Paquete organizado para publicar el sitio. Subí el contenido de esta carpeta a la raíz del nuevo repositorio, conservando las carpetas.

## Ejecutar localmente

Con Node.js: `npm run dev`. Abrí http://127.0.0.1:5173/. No requiere instalar paquetes ni ejecutar un build.

## Imágenes

Las fotos originales están agrupadas en `imagenes/propiedades/`, con una carpeta por inmueble y archivos numerados con el nombre de ese inmueble. Los proyectos se ordenan en `imagenes/desarrollos/`. Las variantes WebP de galería y portada siguen la misma estructura en `assets/properties/`. La portada usa WebP de 640 y 1280 px; las miniaturas usan 160 px.

Las imágenes principales limpias se identifican con `-limpia`. El paquete incluye galerías publicadas y proyectos visibles.

## Revisar la copia

`npm run check` comprueba sintaxis y que todos los archivos del manifiesto estén presentes.

Los mensajes de WhatsApp se preparan según la sección; el visitante los envía desde WhatsApp. No hay backend ni envío automático. Tailwind CDN, las fuentes, los iconos y el mapa necesitan conexión a Internet.

La lista exacta de archivos del sitio está en `upload-manifest.json`.
