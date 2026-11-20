# Tabla: lo que afirma el kit vs. lo que hace la app

Comparación hecha el 20/11/2026 contra https://minimoda-navy.vercel.app (Chromium, Linux).
Los IDs (A01…) son los del [mapa de afirmaciones](mapa-afirmaciones.md). Las capturas están en [evidencias/](evidencias/).

**Hipótesis:** «App» = puede ser un problema de la app · «Doc» = la documentación está desactualizada · «Equipo» = no puedo decidirlo, necesito una decisión.

## Coinciden con la app

| ID | Afirmación | Fuente | Qué hace la app | Evidencia |
|---|---|---|---|---|
| A07, A08 | Filtros por edad, color, precio, búsqueda y orden | MAN §1, CHG 0.9.0 | Están todos: Buscar, Edad, Color, Precio máx. y Ordenar | `app-tienda.png` |
| A11 | «20% menos»: ¿todo el catálogo o solo destacados? | MAN §1 (pendiente) | Solo aparece en los 5 productos marcados «Destacado» | `app-tienda.png` |
| A10 | Los productos sin stock se muestran con el botón deshabilitado | CHAT | 3 productos con botón «Sin stock» deshabilitado (Enterito, Buzo, Remera Skater) | `app-tienda.png` |
| A14 | El carrito está en memoria: si recargás se puede perder | CHAT | Al entrar a /carrito por URL o recargar, el carrito queda vacío. Solo `minimoda_inbox` está en localStorage | `app-carrito-tras-recargar.png` |
| A20 | Contraseña de mínimo 8 | MAN §4 | El formulario dice «Mínimo 8 caracteres» (validado en la clase 1) | clase 1 |
| A22 | Edad entera, rango en el formulario | MAN §4 | «Número entero entre 13 y 120» | clase 1 |
| A27 | `/ayuda` da 404 | CHAT | 404 «No encontramos esta página» | `app-ayuda.png` |
| A03 | En otros países el costo de envío cambia | MAN §3 | Argentina $3.500, Chile $9.000, Japón $28.000 | recorrido |
| A18 | Envío a cualquier país | README | El checkout ofrece 18 países | `app-checkout-vacio.png` |
| A15 | Para pagar, «Finalizar compra» | MAN §2 | El carrito tiene el botón «Finalizar compra» | `app-tienda.png` |
| A24 | Login simulado | MAN §4, README | «El ingreso es simulado: no hay cuentas reales» | recorrido |

## No coinciden: documentación desactualizada (Doc)

| ID | Afirmación | Fuente | Qué hace la app | Evidencia | Hipótesis |
|---|---|---|---|---|---|
| A09 | Los productos sin stock no se listan | MAN §1 | Se listan, con botón deshabilitado | `app-tienda.png` | Doc: el chat de Lucas confirma el cambio |
| A13 | El carrito sobrevive a recargar o entrar a /carrito | MAN §2, README | Se vacía | `app-carrito-tras-recargar.png` | Doc + deuda técnica conocida (CHAT) |
| A19 | Contraseña mínimo 6 | CRIT HIST-12 | Mínimo 8 | clase 1 | Doc: criterios de julio, sin actualizar |
| A21 | Edad mínima 18 | CRIT HIST-12 | Mínimo 13 | clase 1 | Doc o decisión de producto: **Equipo** |
| A26 | La ayuda está en `/ayuda`, enlazada en el pie | MAN §6, README, CHG 0.8.0 | 404, y el pie **no tiene** link a Ayuda (el chat decía que sí) | `app-ayuda.png`, `app-home.png` | Doc + backlog |

## No coinciden: posible problema de la app o decisión pendiente

| ID | Afirmación | Fuente | Qué hace la app | Evidencia | Hipótesis |
|---|---|---|---|---|---|
| A17 | No se puede confirmar una compra con el carrito vacío | MAN §3, CRIT HIST-18, CHG 0.9.1 | Con el carrito vacío (resumen «Todavía no hay prendas», subtotal $0), la compra **se confirma**: «✅ Compra confirmada. Orden MM-885145» | `app-checkout-vacio.png`, `app-checkout-vacio-confirmar.png` | **App**: tres fuentes coinciden en que debe bloquearse |
| A01, A02 | Envío gratis en Argentina desde $50.000 / $80.000 | MAN, CRIT / CHG, CHAT | Con subtotal $55.600 y con **$83.400** el envío cuesta $3.500. El banner de la propia app dice «Envío gratis desde $80.000» | `app-envio-subtotal-55600.png`, `app-envio-subtotal-83400.png`, `app-home.png` | **App** (no aplica el umbral que anuncia) o **Equipo** |
| A04, A06 | Cupón MINIMODA10 en el checkout | MAN §3, CHG 0.9.1, CHAT, CRIT | No hay campo de cupón, ni con el carrito vacío ni con productos | `app-checkout-con-producto-sin-cupon.png` | **App** (¿no llegó a producción el merge del viernes?) o **Equipo** |
| A25 | Cuotas siempre sin interés | MAN §5, README, CRIT HIST-21 | Las fichas dicen «3 cuotas sin interés», pero Créditos dice «cuotas con **10% de interés**» | `app-ficha.png`, `app-creditos.png` | **Equipo**: es el «gancho comercial» según el README |
