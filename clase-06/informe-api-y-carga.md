# Clase 6 · Informe de pruebas de API y de carga

**API:** MiniModa API 1.0.0 · modo con-defectos · http://localhost:4000
**Herramientas:** Bruno CLI 4.3.0 (`bru run`) · k6 v2.1.0 · IA usada: Claude Code (Claude Opus 5.5)
**Fecha:** 20/11/2026 · Linux, Node 24 · k6 y la API en la misma compu
**Oráculo:** el contrato `http://localhost:4000/openapi.json`. La API se probó como caja negra: no se abrió `server.js`.

## 1. Casos

| id | tipo | solicitud | esperado (contrato) | cita del contrato | obtenido | ¿pasa? |
|---|---|---|---|---|---|---|
| CP01 | negativo | `GET /productos/999` | 404 con esquema Error (`codigo`, `mensaje`, `detalles`) | `paths./productos/{id}.get.responses.404` | 200 con `{"producto": null}` | ❌ |
| CP02 | negativo | `POST /carritos/{id}/items` con `{"productoId": 4, "cantidad": 0}` | 400 con esquema Error | `components.schemas.NuevoItem.properties.cantidad.minimum = 1` y `paths./carritos/{carritoId}/items.post.responses.400` | 201: agrega el item con cantidad 0 y subtotal 0 | ❌ |
| CP03 | valor límite | `GET /productos/buscar?q=re` (2 caracteres, el mínimo) | 200 con `ResultadoBusqueda` (`q`, `total`, `productos`) | `paths./productos/buscar.get.parameters.q.schema.minLength = 2` y `responses.200` | 200 con `q`, `total` y `productos` | ✅ |
| CP04 | secuencia | `POST /carritos` → `POST /carritos/{id}/items` `{"productoId": 3, "cantidad": 1}` → `GET /carritos/{id}` | 200, el mismo carrito con 1 item; `precioUnitario` número; `subtotal = precioUnitario × cantidad` | `paths./carritos/{carritoId}.get.responses.200` y `components.schemas.ItemCarrito.properties.precioUnitario` (type: number) | 200, mismo carrito con 1 item, pero `precioUnitario` llega como texto: `"5600"` | ❌ (parcial) |
| CP05 | idempotencia | `POST /pedidos` dos veces con el mismo `Idempotency-Key` y el mismo cuerpo, sobre un carrito propio | 201 las dos veces, el mismo `id` de pedido y `Idempotent-Replayed: true` en la segunda | `paths./pedidos.post.description` y `paths./pedidos.post.responses.201.headers.Idempotent-Replayed` | 201 y 201, mismo pedido, `Idempotent-Replayed: true` | ✅ |
| CP06 | formato de error | `GET /productos/buscar?q=a` | 400 con `codigo` (texto), `mensaje` (texto) y `detalles` (lista) | `paths./productos/buscar.get.responses.400` y `components.schemas.Error` | 400 con los tres campos y los tipos correctos | ✅ |
| B01 | búsqueda (para la carga) | `GET /productos/buscar?q=remera` | 200 y `productos` es una lista | `paths./productos/buscar.get.responses.200` | 200 y lista | ✅ |

## 2. Resultados de la colección

Comando: `cd clase-06/coleccion && bru run --env local > ../resultados/coleccion.txt` · Resultado: **14 de 19 aserciones pasaron** (12 solicitudes: 9 pasaron, 3 fallaron) · Salida: [resultados/coleccion.txt](resultados/coleccion.txt)

**Aprendizaje de la primera corrida:** en la primera versión, el pedido de CP05 usaba el mismo carrito que CP02. Por el defecto de CP02, ese carrito tenía un item con cantidad 0, y el pedido respondió 400 `CARRITO_VACIO`. Parecía un defecto de idempotencia, pero era un problema de diseño de la colección: dos casos compartían datos. Con un carrito propio para CP05, la idempotencia cumple el contrato. Ahora cada caso que crea un pedido arma su propio carrito.

## 3. Issues

- #3 · `GET /productos/{id}` devuelve 200 con `producto: null` para un producto que no existe · `api`
- #4 · `POST /carritos/{id}/items` acepta cantidad 0 y deja el carrito sin poder confirmarse · `api`
- #5 · `GET /productos/buscar` supera el p95 de 300 ms con 20 usuarios · `performance`

## 4. Preguntas para el equipo

- **Tipo de `precioUnitario` (CP04):** el contrato dice `number` y llega `"5600"` (texto). El `subtotal` sí llega como número. ¿Es un defecto o el contrato tiene que aceptar texto? Queda como pregunta, no como tercer issue de API, porque la práctica pide dos.
- **Carrito con un item de cantidad 0:** al confirmar el pedido, la API responde 400 `CARRITO_VACIO` («El carrito no tiene items válidos») aunque el carrito tiene otro item válido. El contrato no define qué pasa con un carrito así: ¿se ignora el item inválido o se rechaza todo el pedido?
- **Carga esperada:** el contrato fija el objetivo en «20 usuarios a la vez». ¿Es el pico o el promedio de uso? Cambia cómo se interpreta el resultado de 20 VU.

## 5. Carga y conclusión

**Perfil:**

| Campo | Valor |
|---|---|
| Endpoint | `GET /productos/buscar` (parámetro `q=remera`) |
| Rampa | de 0 a N usuarios en 10 s |
| Sostenido | 30 s |
| Bajada | 5 s |
| Pausa entre acciones | 1 s |
| Usuarios | 1, 5 y 20 VU |
| Objetivo | `p(95) < 300 ms` y menos de 1 % de errores (`paths./productos/buscar.get.description`) |
| Entorno | k6 y la API en la misma compu, `http://localhost:4000` |

Script: [k6/carga.js](k6/carga.js) · Resúmenes: [1 VU](k6/resultados/resumen-1-vu.txt), [5 VU](k6/resultados/resumen-5-vu.txt), [20 VU](k6/resultados/resumen-20-vu.txt) · [Reporte HTML de 20 VU](k6/resultados/reporte-20-vu.html)

| corrida | p90 | p95 | tasa de error | solicitudes por segundo | umbrales |
|---|---|---|---|---|---|
| 1 VU | 47,26 ms | 47,49 ms | 0,00 % (0 de 44) | 0,96 | ✓ los dos |
| 5 VU (línea base) | 49,21 ms | 50,04 ms | 0,00 % (0 de 185) | 4,04 | ✓ los dos |
| 20 VU | 397,31 ms | **404,71 ms** | 0,00 % (0 de 579) | 12,67 | ✗ `p(95)<300` · ✓ errores |

Cada número sale de la línea `http_req_duration`, `http_req_failed` y `http_reqs` del resumen correspondiente.

**Conclusión:** con 1 y 5 VU el p95 se mantiene en unos 50 ms. Con 20 VU, que es la carga que fija el contrato, el p95 sube a 404,71 ms: **8 veces la línea base y 105 ms por encima del umbral de 300 ms**. No hubo errores en ninguna corrida y los checks pasaron al 100 %: la API responde bien, pero no a tiempo con 20 usuarios. También bajó el ritmo de cada usuario: la iteración promedio pasó de 1,04 s a 1,32 s.

**Hipótesis para el equipo (sin confirmar):**
1. El modo con defectos agrega una demora que crece con la concurrencia. Prueba: repetir las tres corridas con la API en `MODO=estable` y comparar.
2. La búsqueda se resuelve de forma secuencial y las solicitudes se encolan. Prueba: correr 10 y 15 VU para ver si la degradación es gradual o aparece de golpe en un número de usuarios.

**Límites:** k6 y la API corrieron en la misma compu, así que compiten por CPU y memoria. Los números sirven para comparar entre corridas en este entorno, no para predecir producción. Fue una sola corrida por cantidad de usuarios, con datos en memoria y sin red real de por medio.
