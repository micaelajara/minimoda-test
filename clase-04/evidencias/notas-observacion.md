# Notas de observación del checkout (paso 4.1)

Fecha: 20/11/2026 · Demo: https://minimoda-navy.vercel.app/checkout

## Precondición observada

- Entrar directo a /checkout no alcanza: hay que ir a la tienda, agregar al menos un producto al carrito y abrir el checkout desde esa página.
- Producto usado en la observación: Gorrito de Lana Osito (quedaron 11 unidades en el carrito por pruebas repetidas).

## PAGO-01 · Compra válida (observado)

Datos: Ana Prueba · Calle Falsa 123 · ana.prueba@example.com · Argentina · 4111111111111111 · 12/30 · CVV 123.
Resultado: caja verde con «✅ Compra confirmada. Orden MM-471627. Envío a Argentina: $ 3.500. Te enviamos un email de confirmación (ver Bandeja).»
El número de orden cambia en cada compra: el test debe comprobar «Compra confirmada» y el formato «Orden MM-», no el número.
Captura: paso4-observado-compra-confirmada.png

## PAGO-02 · CVV de 2 dígitos (observado)

Datos: los mismos, con CVV 12.
Resultado: debajo del campo CVV, en rojo, «El CVV debe tener 3 o 4 dígitos.»
Captura: paso4-observado-cvv-12.png

## Otros detalles vistos

- El checkout tiene una sección desplegable «Tarjetas de prueba (bypass)».

## Paso 5 · Fallo intermitente detectado por el hook PostToolUse (20/11/2026 19:53)

- Tras una edición inocua (un comentario en tests/pago.spec.ts), el hook PostToolUse corrió la suite y reportó «La suite no terminó en verde».
- Falló PAGO-02 en el beforeEach: `page.goto: Test timeout of 30000ms exceeded`, esperando el evento "load" de https://minimoda-navy.vercel.app/tienda.
- La página ya estaba renderizada (el snapshot muestra la tienda con el carrito en 0), pero el evento "load" no llegó a tiempo: lentitud de la demo, no error de la lógica del test.
- Re-ejecución: 3 corridas seguidas de la suite completa, 4 passed en las tres. Es un test flaky por dependencia externa.
- Captura: paso5-posttooluse-detecta-fallo.png
