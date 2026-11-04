# Capacidades con Playwright MCP y MCP propio

## Playwright MCP

El agente pudo abrir MiniModa, recorrer el catálogo y leer datos visibles del producto Body Manga Larga Estrellitas: talle 6M, stock 12 y precio final de $ 8.500. También pudo accionar «Agregar al carrito», navegar al carrito y guardar evidencia de tienda y carrito. La captura `02-carrito.png` muestra una unidad y un total de $ 8.500.

En una repetición de la navegación durante esta sesión, el carrito apareció vacío después de agregar el producto. Por eso, el estado debe verificarse en la interfaz antes de aceptar la evidencia; la persistencia del carrito no fue consistente en todas las ejecuciones.

## MCP propio: `casos-de-prueba`

El MCP pudo crear el caso de prueba en Markdown con título, requisito, prioridad, datos, pasos y resultado esperado. El archivo generado quedó en `casos/agregar-un-producto-con-stock-al-carrito-en-minimoda-4a677a73.md`. El servidor también ofrece listar los casos guardados. La captura `03-mcp.png` registra la conexión del MCP en Codex.

## Ahorro estimado

Estimo que hacerlo a mano —recorrer la tienda, revisar stock y carrito, redactar el caso y guardar evidencia— llevaría unos 15–20 minutos. Con ambos MCP, la exploración y la creación del archivo llevaron aproximadamente 5–7 minutos de interacción y revisión: un ahorro estimado de 10–13 minutos (cerca de 60–70%). Es una estimación de esta ejecución, no una medición controlada; varía según el flujo y la revisión humana.

## Límites

- Playwright MCP opera la interfaz visible. Las capturas y el árbol de accesibilidad ayudan a comprobar lo que se muestra, pero no inspeccionan por sí solos la implementación interna.
- El carrito mostró estados distintos al repetir la navegación. Hace falta comprobar el resultado final y repetir cuando no coincide con lo esperado.
- El MCP propio solo crea y lista archivos Markdown. No edita ni elimina casos, ni valida que los pasos y resultados sean correctos para el producto.
- La automatización acelera la exploración y el formato; la persona debe revisar el requisito y que cada evidencia corresponda al estado descrito.
