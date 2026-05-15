# Gratitude — Sitio Web Oficial

Sitio web completo del restaurante-café **Gratitude** (Buenos Aires, Argentina).  
Incluye sitio público con diseño editorial premium y panel de administración para gestionar imágenes y textos sin tocar código.

---

## Índice

1. [Inicio rápido](#1-inicio-rápido)
2. [Variables de entorno](#2-variables-de-entorno)
3. [Panel de administración](#3-panel-de-administración)
4. [Cambiar contraseña admin](#4-cambiar-contraseña-admin)
5. [Configurar Cloudinary](#5-configurar-cloudinary)
6. [Configurar Supabase](#6-configurar-supabase-opcional)
7. [Deploy en Vercel](#7-deploy-en-vercel)
8. [Estructura del proyecto](#8-estructura-del-proyecto)

---

## 1. Inicio rápido

**Requisitos:** Node.js 18+ y npm 9+

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editá .env.local con tus datos (ver sección 2)

# Correr en desarrollo
npm run dev
```

- Sitio público: http://localhost:3000  
- Panel admin: http://localhost:3000/admin

---

## 2. Variables de entorno

Copiá `.env.example` como `.env.local` y completá los valores:

| Variable | Descripción | Requerida |
|---|---|---|
| `NEXTAUTH_SECRET` | Clave secreta para JWT (mínimo 32 chars) | ✅ |
| `NEXTAUTH_URL` | URL del sitio (`http://localhost:3000` en dev) | ✅ |
| `ADMIN_USERNAME` | Nombre de usuario del admin | ✅ |
| `ADMIN_PASSWORD_HASH_B64` | Hash bcrypt en base64 (ver sección 4) | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloud name de Cloudinary | Para imágenes |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary | Para imágenes |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary | Para imágenes |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | Opcional |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anon de Supabase | Opcional |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key de Supabase | Opcional |
| `SMTP_HOST` | Host del servidor de email | Para contacto |
| `SMTP_PORT` | Puerto SMTP (generalmente 587) | Para contacto |
| `SMTP_USER` | Email del remitente | Para contacto |
| `SMTP_PASS` | App Password de Gmail | Para contacto |
| `CONTACT_TO_EMAIL` | Email de destino para mensajes | Para contacto |

---

## 3. Panel de administración

Acceso desde `/admin` o el enlace discreto en el footer del sitio.

**Credenciales por defecto (solo desarrollo):**
- Usuario: `admin`
- Contraseña: `gratitude2024`

### Funcionalidades del panel

**Imágenes** — gestioná todas las fotos del sitio:
- Organizadas por sección: Hero, Sobre Nosotros, Galería, Menú
- Subir con drag & drop o selector de archivo
- Eliminar con confirmación de seguridad
- Los cambios se ven en el sitio inmediatamente

**Textos** — editá sin código:
- Tagline del hero
- Título y texto "Sobre Nosotros"
- Títulos de secciones Menú y Galería
- Guardado instantáneo con botón "Guardar Cambios"

**Vista previa** — preview del sitio en tiempo real dentro del panel

---

## 4. Cambiar contraseña admin

```bash
node scripts/generate-password.js tu-nueva-contraseña
```

Copiá la línea que imprime y reemplazá `ADMIN_PASSWORD_HASH_B64` en `.env.local`.

---

## 5. Configurar Cloudinary

1. Registrate gratis en [cloudinary.com](https://cloudinary.com)
2. Copiá Cloud Name, API Key y API Secret desde el dashboard
3. Agregá esos valores a `.env.local`

Sin Cloudinary, las imágenes demo usan URLs de Unsplash (no modificables por el admin).

---

## 6. Configurar Supabase (opcional)

Para producción con persistencia real (recomendado para Vercel):

1. Creá un proyecto en [supabase.com](https://supabase.com)
2. Ejecutá `supabase/schema.sql` en el SQL Editor de Supabase
3. Copiá las credenciales a `.env.local`

Sin Supabase, el sitio usa archivos JSON locales (válido solo para desarrollo).

---

## 7. Deploy en Vercel

1. Subí el código a GitHub
2. Importá el repo en [vercel.com/new](https://vercel.com/new)
3. Configurá las **Environment Variables** en el dashboard de Vercel  
   (las mismas variables que en `.env.local`)
4. Hacé Deploy

**Importante para producción en Vercel:**
- Cloudinary es **obligatorio** (Vercel no persiste archivos locales)
- Supabase es **recomendado** para guardar contenidos y menú

---

## 8. Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Página principal
│   ├── admin/page.tsx            # Login admin
│   ├── admin/dashboard/page.tsx  # Panel admin
│   └── api/
│       ├── auth/{login,logout,me}/
│       ├── images/[id]/
│       ├── content/
│       ├── menu/
│       └── contact/
├── components/
│   ├── sections/  (Navbar, Hero, About, Menu, Gallery, Contact, Footer)
│   ├── admin/     (AdminGuard, ImageManager, ContentEditor)
│   └── ui/        (RevealOnScroll)
├── lib/
│   ├── auth.ts        # JWT con jose
│   ├── cloudinary.ts  # Storage de imágenes
│   ├── supabase.ts    # Cliente Supabase
│   └── db.ts          # DB local en JSON (desarrollo)
└── types/index.ts

data/           # Generado automáticamente (imágenes, contenido, menú)
scripts/        # Utilidades (generate-password.js)
supabase/       # Schema SQL para producción
```

---

## Stack

| Tecnología | Uso |
|---|---|
| Next.js 16 + TypeScript | Framework principal |
| Tailwind CSS v4 | Estilos |
| Cormorant Garamond + Playfair Display + Inter | Tipografía |
| jose + bcryptjs | Auth JWT |
| Cloudinary | Almacenamiento de imágenes |
| Supabase PostgreSQL | Base de datos (producción) |
| Vercel | Deploy |

---

**Contacto del restaurante:**  
Palermo: Av. Dorrego 1771 | San Fernando: Av. Libertador 3180  
Tel: (011) 4890-8683 | Email: liligratitude@gmail.com.ar
