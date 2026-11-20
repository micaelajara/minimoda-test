# Casos de prueba · Checkout de MiniModa (pago)

Demo: https://minimoda-navy.vercel.app · Fuente: observación manual en la demo (ver `evidencias/notas-observacion.md`).
Datos de prueba ficticios; no usar datos reales de pago.

## Precondición (común a ambos casos)

1. Entrar a la tienda: https://minimoda-navy.vercel.app/tienda
2. Agregar al menos un producto al carrito (en la observación se usó «Gorrito de Lana Osito»): en la tarjeta del producto, clic en el botón «Agregar al carrito».
3. Abrir el checkout desde la tienda con el link «Checkout» del menú principal.

> Entrar directo a `/checkout` no alcanza: el carrito tiene que tener al menos un producto.
>
> **Observado (20/11/2026):** cada producto es un `article` con su nombre como heading; el botón es `getByRole('button', { name: 'Agregar al carrito' })` dentro de esa tarjeta. El link es `getByRole('link', { name: 'Checkout' })` dentro de `navigation "Principal"`. Al agregar aparece un toast con `role="status"`: «Listo, lo sumamos al carrito.»

## Datos base

| Campo | Valor |
|---|---|
| Nombre | Ana Prueba |
| Dirección | Calle Falsa 123 |
| Email | ana.prueba@example.com |
| País | Argentina |
| Tarjeta | 4111111111111111 |
| Vencimiento | 12/30 |
| CVV | 123 |

---

## PAGO-01 · Compra válida

- **Tipo:** positivo
- **Datos:** datos base (CVV 123).
- **Pasos:**
  1. Cumplir la precondición.
  2. Completar los campos con los datos base.
  3. Hacer clic en «Confirmar compra».
- **Resultado esperado (observado):** aparece una caja con
  «✅ Compra confirmada. Orden MM-471627. Envío a Argentina: $ 3.500. Te enviamos un email de confirmación (ver Bandeja).»
- **Qué verificar:** el texto «Compra confirmada» y una orden con formato `MM-` seguido de números (p. ej. `/MM-\d+/`). **No** verificar el número exacto: cambia en cada compra.
- **Evidencia:** `evidencias/paso4-observado-compra-confirmada.png`

## PAGO-02 · CVV de 2 dígitos

- **Tipo:** negativo
- **Datos:** datos base, pero CVV `12`.
- **Pasos:**
  1. Cumplir la precondición.
  2. Completar los campos con los datos base, usando CVV `12`.
  3. Hacer clic en «Confirmar compra».
- **Resultado esperado (observado):** debajo del campo CVV aparece en rojo «El CVV debe tener 3 o 4 dígitos.» y la compra **no** se confirma.
- **Qué verificar:** el mensaje de error visible y que no aparezca «Compra confirmada».
- **Evidencia:** `evidencias/paso4-observado-cvv-12.png`
