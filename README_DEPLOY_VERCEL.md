# Despliegue a Vercel

Instrucciones rápidas para desplegar este proyecto en Vercel conectado a un repositorio GitHub.

1. Verificar build localmente

```bash
npm install
npm run build
npm run preview # opcional para probar el build
```

2. Subir a GitHub

- Crea un nuevo repo en GitHub.
- En tu carpeta local ejecuta:

```bash
git init
git add .
git commit -m "Prepare for Vercel deploy"
git branch -M main
git remote add origin <URL-DE-TU-REPO>
git push -u origin main
```

3. Conectar a Vercel

- Ve a https://vercel.com/ y logueate con tu cuenta GitHub.
- Crea un nuevo proyecto -> Importar desde GitHub -> selecciona el repo.
- En Build settings deja `npm run build` (ya está detectado) y `dist` como directorio de salida.
- Deploy.

4. Variables de entorno

No hay variables obligatorias para este proyecto. Si usás `WHATSAPP_NUMBER` u otras, configuralas en Vercel (Project Settings > Environment Variables).

5. Si querés, puedo intentar automatizar el `git push` si me pasás la URL del repo remoto, pero por seguridad tenés que ejecutar el `git push` desde tu terminal si no querés compartir credenciales.
