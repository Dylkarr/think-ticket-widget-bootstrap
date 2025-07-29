# Think Ticket Widget (Bootstrap)

Widget Vue 3 empaquetado como custom element con **Bootstrap 5** para un look profesional.

## Instalación y desarrollo

```bash
pnpm install
pnpm run dev        # levanta widget en http://localhost:5180
```

### Probar con página anfitriona

En otra terminal:

```bash
cd host-demo
npx serve .         # abre http://localhost:3000
```

El widget se verá incrustado ocupando toda la pantalla.

## Cómo incrustar en _otra_ web

1. **Build** el widget y súbelo a tu hosting / CDN:

   ```bash
   pnpm run build
   # dist/think-ticket-widget.iife.js
   ```

2. En la página donde quieras incluirlo, agrega:

   ```html
   <!-- Bootstrap opcional si deseas reutilizar estilos fuera del shadow root -->
   <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.js"></script>

   <!-- Widget -->
   <script src="https://tu-cdn.com/think-ticket-widget.iife.js"></script>
   <script>
     ThinkTicketWidget.register();    // define <think-ticket-login>
   </script>

   <!-- En cualquier lugar del HTML -->
   <think-ticket-login style="display:block;height:600px;"></think-ticket-login>
   ```

El widget trae su propio CSS de Bootstrap dentro del shadow DOM, así que no ensucia tu styling global.

## Variables de entorno

Crea `.env`:

```
VITE_API_URL=https://api.tu-backend.com
```

El backend debe:

- Responder **POST /admin_auth/login** con `{ user: {…} }` y setear la cookie `sessionId`  
- Permitir CORS con `Access-Control-Allow-Origin` igual al dominio donde hospedes el widget, y `Access-Control-Allow-Credentials:true`.

```ts
app.enableCors({ origin: ['https://tu-web.com'], credentials: true })
```

## Deploy rápido en Netlify / Cloudflare Pages

1. Sube el repo.
2. Build command: `pnpm i && pnpm run build`
3. Publish directory: `dist`
4. Añade archivo `_headers` con tu CSP/CORS si vas a servir desde dominio diferente.
