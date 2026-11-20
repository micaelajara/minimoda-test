# Mapa de afirmaciones del kit de bienvenida

Qué dice cada archivo del kit, de dónde sale y si ya lo comparé con la app.
Cuando dos fuentes no coinciden, quedan las dos filas: todavía no decido cuál es la correcta.

**Kit:** `kit-bienvenida-minimoda/` (release `kit-clase-5` de Simonethg/minimoda-test).
**App:** https://minimoda-navy.vercel.app

## Fuentes

| Código | Archivo | Fecha que declara | Advertencia que trae el propio archivo |
|---|---|---|---|
| README | `README.md` (Mei) | agosto 2026 | «armado a las apuradas»; remite al manual y al changelog |
| MAN | `manual-de-uso.pdf` v0.6 | septiembre 2026 | «en actualización», secciones PENDIENTE; Lucas dijo que le faltaba una pasada |
| CRIT | `criterios-aceptacion-sprint-14.pdf` | julio 2026 | «no se actualizó en sprints posteriores» |
| CHG | `CHANGELOG.md` (Mei) | ago a oct 2026 | «parcial, hay huecos, fechas aproximadas» |
| CHAT | `chat-lucas-dev.png` (#minimoda) | 12 y 13 de octubre | mensajes informales del dev |

## Afirmaciones

| ID | Tema | ¿Qué se afirma? | Fuente | ¿Comparado con la app? |
|---|---|---|---|---|
| A01 | Envío | Envío gratis en Argentina desde **$50.000** | MAN §3, CRIT HIST-18 | Sí: no coincide |
| A02 | Envío | Envío gratis en Argentina desde **$80.000** | CHG 0.9.0, CHAT (12/10) | Sí: no coincide |
| A03 | Envío | En otros países el costo cambia; la tabla por zona está pendiente («en un excel») | MAN §3, CHAT | Sí: coincide |
| A04 | Cupón | Cupón de bienvenida **MINIMODA10**, 10% sobre el subtotal de prendas | MAN §3, CHG 0.9.1, CHAT | Sí: no hay campo de cupón |
| A05 | Cupón | «Si no anda avisame porque lo mergeé un viernes a las 8» | CHAT | No: sin campo para probar |
| A06 | Cupón | Se puede aplicar un cupón comercial en el checkout | CRIT HIST-18, README | Sí: no coincide |
| A07 | Tienda | Filtros por edad (Bebé, Niña, Niño, Pre-teen), color y precio, y búsqueda por nombre | MAN §1, README, CHG 0.9.0 | Sí: coincide |
| A08 | Tienda | Hay orden (sort) en la tienda | CHG 0.9.0 | Sí: coincide |
| A09 | Stock | Las prendas **sin stock no se listan** ni se pueden abrir | MAN §1 | Sí: no coincide |
| A10 | Stock | Las prendas sin stock **se siguen mostrando con el botón deshabilitado** | CHAT (12/10) | Sí: coincide |
| A11 | Tienda | Hay un descuento «20% menos»; no está claro si es para todo el catálogo o solo destacados | MAN §1 (nota PENDIENTE) | Sí: solo destacados |
| A12 | Carrito | Se agrega con «Agregar al carrito» desde la **ficha** del producto | MAN §2 | Sí: también desde la tienda |
| A13 | Carrito | El carrito **se guarda en el navegador**: sobrevive a recargar o entrar a /carrito | MAN §2, README | Sí: no coincide |
| A14 | Carrito | El carrito está **en memoria**, no en localStorage: si recargás se puede perder | CHAT (12/10) | Sí: coincide |
| A15 | Carrito | Para pagar, se va a «Finalizar compra» | MAN §2 | Sí: coincide |
| A16 | Checkout | Pide nombre, dirección, email (formato válido), país, tarjeta, vencimiento MM/AA, CVV de 3 o 4 dígitos y cupón opcional | MAN §3 | Parcial: falta el cupón |
| A17 | Checkout | No se puede confirmar con el carrito vacío | MAN §3, CRIT HIST-18, CHG 0.9.1 | Sí: no coincide |
| A18 | Checkout | Envío a cualquier país | README | Sí: coincide |
| A19 | Registro | Contraseña de **mínimo 6** caracteres | CRIT HIST-12 | Sí: no coincide |
| A20 | Registro | Contraseña de **mínimo 8** caracteres («este manual pisa esa cifra») | MAN §4 | Sí: coincide |
| A21 | Registro | Edad mínima **18** | CRIT HIST-12 | Sí: no coincide |
| A22 | Registro | Edad entera; «el rango exacto está en el formulario» | MAN §4 | Sí: coincide (13 a 120) |
| A23 | Registro | Campos: nombre, email, contraseña, confirmación, edad, país, términos; país y términos obligatorios | MAN §4, CRIT HIST-12, CHG 0.8.0 | Sí: coincide |
| A24 | Registro | El login es simulado | MAN §4, README | Sí: coincide |
| A25 | Créditos | Cuotas **sin interés**, tanto en fichas («3 cuotas sin interés») como en Créditos | MAN §5, README, CRIT HIST-21 | Sí: no coincide en Créditos |
| A26 | Ayuda | La ayuda está en `/ayuda`, enlazada en el pie del sitio | MAN §6, README, CHG 0.8.0 | Sí: no coincide |
| A27 | Ayuda | `/ayuda` **nunca se terminó**: el footer apunta ahí pero da 404 | CHAT (13/10) | Sí: coincide (404) |
| A28 | Ayuda | Cambios y devoluciones: plazo de 30 días, mail a hola@minimoda.test (que no existe; los avisos van a la Bandeja) | MAN §6 | Parcial: vi los 30 días en la ficha |
| A29 | Avisos | Hay una Bandeja de mails/avisos de práctica | README, CHG 0.8.0, MAN §6 | Parcial: no abrí la Bandeja |

## Diferencias entre fuentes (antes de mirar la app)

| Tema | Filas en conflicto | Nota |
|---|---|---|
| Umbral de envío gratis | A01 vs A02 | Las fuentes de $80.000 son más nuevas, pero eso no prueba cuál refleja la app |
| Productos sin stock | A09 vs A10 | El chat dice que «el manual viejo decía otra cosa» |
| Persistencia del carrito | A13 vs A14 | Lucas lo anotó como deuda técnica |
| Longitud de contraseña | A19 vs A20 | Los criterios ya decían «revisar longitud de contraseña» |
| Edad mínima | A21 vs A22 | En la clase 1 observé 13 a 120 (a reconfirmar) |
| Página de ayuda | A26 vs A27 | El changelog dice que se agregó en 0.8.0 |
