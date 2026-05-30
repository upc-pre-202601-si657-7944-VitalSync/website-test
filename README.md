# MediBridge Landing Page

Landing page informativa de **MediBridge**, plataforma de monitoreo y gestión del cuidado de adultos mayores desarrollada por la startup **VitalSync**.

## Descripción

Sitio web estático que presenta la propuesta de valor de MediBridge a sus dos segmentos objetivo: la Red de Apoyo Familiar y el Personal de Cuidado. Incluye información sobre funcionalidades, planes de suscripción, equipo y preguntas frecuentes.

## Stack

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox)
- JavaScript Vanilla
- GSAP + ScrollTrigger (vía CDN)
- Google Fonts

## Secciones

1. Nav (logo, enlaces, toggle idioma, toggle tema)
2. Hero / Banner (video de fondo + KPIs animados)
3. Solución (problema, misión, visión)
4. Perfiles / Segmentos (tarjetas por segmento con CTA)
5. Tecnología / Features
6. How It Works (proceso en pasos)
7. Producto (video embebido)
8. Pricing / Suscripción
9. Equipo (grid + video embebido)
10. FAQ (acordeón)
11. Footer (enlaces + términos y condiciones)

## Páginas

- `index.html` — Landing principal
- `terms.html` — Términos y Condiciones

## Internacionalización (i18n)

- Inglés (en_US) como idioma por defecto, hardcodeado en el HTML.
- Español (es_419) cargado por `fetch` desde `i18n/es.json` al cambiar de idioma.
- Toggle de idioma en la navegación.

## Cómo correr local

```bash
npx serve .
```

O con Python:

```bash
python -m http.server 8080
```

Abrir `http://localhost:8080` (NO doble clic al archivo, `file://` bloquea los `fetch` de i18n).

## Convenciones

- **GitFlow:** `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `chore:`
- **Semantic Versioning:** `MAJOR.MINOR.PATCH`

## Despliegue

GitHub Pages desde la rama `main`.
