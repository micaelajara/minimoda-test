# Clase 5 · Onboarding con IA: validar el kit de bienvenida contra la app

Práctica de TestingAI (Academia QA). Entro como tester nueva a MiniModa, recibo el kit de bienvenida
([release kit-clase-5](https://github.com/Simonethg/minimoda-test/releases/tag/kit-clase-5)) y valido
la documentación contra https://minimoda-navy.vercel.app antes de escribir casos.

| Archivo | Qué tiene |
|---|---|
| [mapa-afirmaciones.md](mapa-afirmaciones.md) | 29 afirmaciones del kit, con su fuente y si ya las comparé con la app |
| [tabla-info-vs-app.md](tabla-info-vs-app.md) | Qué dice el kit vs. qué hace la app, con evidencia e hipótesis |
| [preguntas-abiertas.md](preguntas-abiertas.md) | Decisiones pendientes del equipo y lo que no llegué a validar |
| [casos-qase.md](casos-qase.md) | Los 3 casos de Qase (MINIMODA-11, 12 y 13) y el resultado del run |
| [qase-import-clase5.csv](qase-import-clase5.csv) | El CSV con el que se importaron los casos en Qase |
| [evidencias/](evidencias/) | Capturas de la app y de Qase |

**Cómo se hizo:** un recorrido automático con Playwright (agente) para una primera pasada con capturas,
y confirmación manual en mi navegador del hallazgo más grave (compra confirmada con el carrito vacío).

**Resultado del run en Qase:** 2 fallados (carrito vacío, envío gratis) y 1 pasado (producto sin stock).
