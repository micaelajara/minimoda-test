---
name: caso-a-playwright
description: Convierte un caso confirmado del checkout MiniModa en test Playwright.
---
Entrada: ID, precondiciones, pasos, datos sintéticos y esperado observado.
1. Leé las reglas raíz y de tests/ y el caso indicado.
2. Separá datos confirmados de dudas; pedí lo faltante.
3. Proponé el test con getByRole/getByLabel y sin esperas fijas.
4. Conservá el ID en el nombre del test e incluí assertions del esperado.
5. Mostrá el diff y explicá qué comprueba cada assertion.
6. Corré la suite si los permisos lo permiten; si no, informalo.
Salida: tests/pago.spec.ts + evidencia de ejecución + dudas A VERIFICAR.
Nunca inventes copy, locators ni resultados de ejecución.
