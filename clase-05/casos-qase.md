# Casos cargados en Qase · suite «Clase 5 · Exploratorio MiniModa»

IDs en Qase: Caso 1 = MINIMODA-11 · Caso 2 = MINIMODA-12 · Caso 3 = MINIMODA-13 (importados desde `qase-import-clase5.csv`).

Proyecto MiniModa (Qase Free). Run: «Exploratorio MiniModa».

---

## Caso 1 · Checkout: no permite confirmar con el carrito vacío

- **Descripción:** Cubre: confirmación de compra sin prendas. Fuentes: manual-de-uso.pdf §3, criterios-aceptacion-sprint-14.pdf HIST-18, CHANGELOG.md 0.9.1.
- **Precondiciones:** ventana de incógnito (carrito vacío). Entrar directo a https://minimoda-navy.vercel.app/checkout. El Resumen dice «Todavía no hay prendas en el carrito».
- **Pasos y datos (sintéticos):**
  1. Nombre: `Ana Prueba` · Dirección: `Calle Falsa 123` · Email: `ana.prueba@example.com` · País: Argentina
  2. Tarjeta: `4111111111111111` · Vencimiento: `12/30` · CVV: `123`
  3. Clic en «Confirmar compra»
- **Resultado esperado:** según el manual §3, «No se puede confirmar una compra si el carrito está vacío: el botón no debería completar la orden». No aparece «Compra confirmada».
- **Tipo / prioridad:** negativo · alta
- **Resultado del run:** ❌ Fallado. Aparece «✅ Compra confirmada. Orden MM-993378» con subtotal $0.
- **Evidencia:** `evidencias/confirmado-por-mi-carrito-vacio-compra-confirmada.png`

---

## Caso 2 · Envío gratis en Argentina con subtotal mayor a $80.000

- **Descripción:** Cubre: umbral de envío gratis. Fuentes: CHANGELOG.md 0.9.0 y chat-lucas-dev.png (12/10) dicen $80.000; el banner de la app también. manual-de-uso.pdf §3 y criterios HIST-18 dicen $50.000 (desactualizados según el chat).
- **Precondiciones:** carrito vacío. Entrar a https://minimoda-navy.vercel.app/tienda
- **Pasos y datos (sintéticos):**
  1. En «Conjunto Deportivo Comodín» ($27.800), clic en «Agregar al carrito» 3 veces (subtotal $83.400)
  2. Ir al checkout con el link «Checkout» del menú (no recargar: el carrito se pierde)
  3. País de envío: Argentina. Mirar el Resumen
- **Resultado esperado:** según el CHANGELOG 0.9.0 y el banner del sitio, «Envío gratis desde $80.000»: Envío $0, Estimado $83.400.
- **Tipo / prioridad:** funcional · alta
- **Resultado del run:** ❌ Fallado. Envío $3.500, Estimado $86.900.
- **Evidencia:** `evidencias/app-envio-subtotal-83400.png`

---

## Caso 3 · Tienda: un producto sin stock se muestra con el botón deshabilitado

- **Descripción:** Cubre: visualización de productos sin stock. Fuentes en conflicto: manual-de-uso.pdf §1 («las prendas sin stock no se listan») vs chat-lucas-dev.png 12/10 («los seguimos mostrando con el botón deshabilitado»).
- **Precondiciones:** entrar a https://minimoda-navy.vercel.app/tienda sin filtros.
- **Pasos y datos:**
  1. Buscar la tarjeta «Enterito de Algodón Nubes»
  2. Mirar el botón de la tarjeta
- **Resultado esperado:** según el chat de Lucas (12/10), el producto aparece en el listado y el botón dice «Sin stock» y está deshabilitado.
- **Tipo / prioridad:** exploratorio · media
- **Resultado del run:** ✅ Pasado. El manual §1 queda desactualizado.
- **Evidencia:** `evidencias/app-tienda.png`
