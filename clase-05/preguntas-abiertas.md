# Preguntas abiertas

Lo que no pude validar o necesita una decisión del equipo. Sin cifras de cobertura: no las medí.

## Para el equipo

1. **Envío gratis:** ¿cuál es el umbral vigente en Argentina? El banner dice $80.000, el manual y los criterios dicen $50.000, y el checkout cobra $3.500 incluso con $83.400. ¿El envío gratis se aplica en otro momento (por ejemplo, al confirmar) o no está implementado?
2. **Cupón MINIMODA10:** el changelog 0.9.1 y Lucas dicen que está en el checkout, pero no hay campo de cupón. ¿Se revirtió, quedó en otra rama o se aplica de otra forma?
3. **Créditos:** ¿las cuotas son sin interés (fichas, manual, README) o con 10% de interés (página Créditos)? ¿Son dos productos distintos?
4. **Edad mínima de registro:** ¿13 (app) o 18 (criterios del sprint 14)? Es una decisión de producto, no solo de documentación.
5. **Carrito:** ¿hay fecha para pasarlo a localStorage? Mientras tanto, ¿actualizamos el manual?
6. **Ayuda:** ¿se quita `/ayuda` del manual y del README hasta que exista la página?

## Lo que no llegué a validar

- **A05:** si el cupón «anda» (no pude probarlo porque no encontré el campo).
- **A16:** el campo de cupón opcional del checkout (mismo motivo).
- **A28:** el plazo de 30 días de Cambios y devoluciones: lo vi en la ficha («Cambios dentro de 30 días»), pero no abrí `/legal/cambios`.
- **A29:** que la Bandeja reciba el email de cada compra: vi la clave `minimoda_inbox` en el navegador, pero no abrí la Bandeja.
- **Umbral exacto de envío:** probé con $55.600 y $83.400. No probé montos más altos ni otros países por encima del umbral.
- **Envíos por zona:** la tabla de costos sigue pendiente según el manual y el chat; solo comparé 3 países.
- **Persistencia del carrito:** la probé en Chromium. No probé otros navegadores.
