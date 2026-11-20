# Clase 7 · Hallazgos hasta ahora (en curso)

Página: https://simonethg.github.io/minimoda-test/practicas/clase-07/kit/ (v1) e index-v2.html (v2). Fecha: 20/11/2026.

## Reto 1 · Lighthouse (v1): 70/100 · reporte en evidencias/lighthouse-v1.report.html

| # | Hallazgo | Criterio WCAG 2.2 | Elemento |
|---|---|---|---|
| L1 | Botón del carrito sin nombre accesible | 4.1.2 (A) | `button.icono-carrito` |
| L2 | Contraste insuficiente del precio de oferta (2,84:1, #999 sobre blanco) | 1.4.3 (AA) | `span.precio-oferta` |
| L3 | `<html>` sin atributo `lang` | 3.1.1 (A) | `html` |
| L4 | Foto principal sin `alt` | 1.1.1 (A) | `img campera-polar.png` |
| L5 | Botones de talle de 18×18 px (mínimo 24×24) | 2.5.8 (AA) | `button.talle` |
| L6 | «Agregar al carrito» con nombre accesible «btn-primary» | 2.5.3 (A) | `button#agregar` |

Pendiente: confirmar al menos dos en la página.

## Reto 4 · Celular, zoom y v2 (Playwright)

| # | Hallazgo | Criterio | Evidencia | ¿Lighthouse? |
|---|---|---|---|---|
| V1 | En v2, con menos de 600 px, el botón «Agregar al carrito» desaparece. Cambio NO pedido (el ticket MM-217 solo pedía el banner «Envío gratis», ver notas-v2.md) | visual / regresión | comparacion-v1-v2-375px.png | No |
| V2 | En 375 px la tabla de talles mide 636 px y obliga a desplazarse de costado (v1 y v2). Con zoom 200 % sobresale 4 px | 1.4.10 Reflow (AA) | v1-375px.png, v1-zoom200.png | No |
| V3 | El banner de cookies tapa el precio y los talles en 375 px | 2.4.11 (AA), a confirmar con teclado | v1-375px.png | No |
| V4 | El banner superior corta el texto: «…en toda la colección de» | visual, a confirmar | v1-375px.png | No |

## Pendiente

- Reto 2 (teclado) y reto 3 (lector de pantalla: Orca en Linux con Super+Alt+S, o F12 › Elements › Accessibility): los hace Micaela.
- Reto 5: tabla final + 3 issues en micaelajara/minimoda-test (2 accesibilidad, 1 visual) con etiquetas `accesibilidad` y `visual`.
