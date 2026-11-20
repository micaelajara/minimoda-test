# Evaluación de Playwright MCP

> Evaluación hecha leyendo el repo oficial, **sin instalar ni ejecutar** la herramienta.
> Fecha de la lectura: 2026-11-20. Lo que no se pudo comprobar está marcado **A VERIFICAR**.

## 1. Ficha

| Campo | Valor | Fuente |
|---|---|---|
| Fuente | https://github.com/microsoft/playwright-mcp | Repo oficial |
| Paquete npm | `@playwright/mcp` (binario `playwright-mcp`) | `package.json` |
| Autor | Microsoft Corporation (org `microsoft` en GitHub) | `package.json` |
| Licencia | Apache-2.0 | `package.json` y página del repo |
| Versión | **0.0.86** (release marcada "Latest", publicada el "18 Nov") | `package.json` y página de releases |
| Requisito | Node >= 20 | `package.json` → `engines` |

Observaciones sobre la versión:
- La serie todavía es `0.0.x`: no hay versión estable 1.0. Entre la 0.0.82 y la 0.0.86 hubo cinco releases en unos dos meses.
- La 0.0.86 depende de `playwright` / `playwright-core` `1.66.0-alpha-2026-11-18`, que son builds **alpha**.
- La página de releases muestra "18 Nov" sin año. Por la fecha del alpha, probablemente sea 2026: **A VERIFICAR**.

## 2. Herramientas que expone

El modo por defecto trabaja sobre el **árbol de accesibilidad** de la página (snapshot) y no sobre píxeles. El modo "vision", que usa coordenadas, es opcional.

> Solo una parte de esta lista se leyó textual del README. El resto viene de un resumen, así que los nombres exactos quedan **A VERIFICAR** contra el README antes de usarlos en una config.

| Grupo | Cómo se activa | Herramientas |
|---|---|---|
| Core | Siempre | `browser_navigate`, `browser_navigate_back`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_select_option`, `browser_press_key`, `browser_hover`, `browser_drag`, `browser_drop`, `browser_file_upload`, `browser_handle_dialog`, `browser_wait_for`, `browser_take_screenshot`, `browser_console_messages`, `browser_network_request(s)`, `browser_evaluate`, `browser_run_code_unsafe`, `browser_emulate_media`, `browser_resize`, `browser_find`, `browser_close` |
| Pestañas | Por defecto | `browser_tabs` |
| Storage | `--caps=storage` | Cookies (`browser_cookie_*`), localStorage y sessionStorage (nombres **A VERIFICAR**), `browser_storage_state`, `browser_set_storage_state` |
| Network | `--caps=network` | `browser_route`, `browser_unroute`, `browser_route_list`, `browser_network_state_set` |
| DevTools | `--caps=devtools` | Tracing, video, grabación, resaltado (`browser_start_tracing`, `browser_start_video`, `browser_highlight`, …) |
| Testing | `--caps=testing` | `browser_generate_locator`, `browser_verify_element_visible`, `browser_verify_text_visible`, `browser_verify_list_visible`, `browser_verify_value` |
| Vision | `--caps=vision` | `browser_mouse_click_xy`, `browser_mouse_move_xy`, `browser_mouse_drag_xy`, `browser_mouse_wheel`, … |
| PDF | `--caps=pdf` | `browser_pdf_save` |
| Config | `--caps=config` | `browser_get_config` |
| WebMCP | Por defecto (se apaga con `--no-webmcp`) | Herramientas que registra la propia página, expuestas como `webmcp_<tool>` |

Inconsistencia en la documentación: la ayuda de `--caps` menciona solo `vision, pdf, devtools`, pero las secciones de herramientas también nombran `network`, `storage`, `config` y `testing`. Qué valores acepta realmente `--caps` en la 0.0.86 queda **A VERIFICAR**.

## 3. Qué toca: archivos, red y sesión

### Archivos
- **Perfil del navegador (por defecto, persistente):** en Linux se guarda en `~/.cache/ms-playwright/mcp-{channel}-{workspace-hash}`. Ahí quedan cookies, logins y storage **entre sesiones**. Un perfil persistente lo puede usar un solo navegador a la vez.
- La ayuda de `--user-data-dir` dice que, si no se indica, se crea un directorio temporal. Eso contradice la sección de perfil persistente: el comportamiento real queda **A VERIFICAR**.
- **Salidas:** `--output-dir` define dónde van las capturas y otros archivos con nombre automático. Los nombres explícitos se resuelven contra la raíz del workspace. El valor por defecto de `--output-dir` queda **A VERIFICAR**. `--output-max-size` borra salidas viejas cuando se supera un tamaño.
- **Sesión, traces y video:** `--save-session` guarda la sesión en el directorio de salida. Traces y video se activan con `--caps=devtools`.
- **Estado y config:** `--storage-state <path>` carga cookies y localStorage, `--config <path>` lee un JSON de configuración, y `--init-script` / `--init-page` inyectan código propio.
- **Acceso a archivos:** por defecto queda limitado a las raíces del workspace y bloquea `file://`. `--allow-unrestricted-file-access` lo abre.

### Red
- Navega a cualquier origen salvo que se configuren `--allowed-origins` / `--blocked-origins`. El README aclara que **no son una barrera de seguridad y no afectan las redirecciones**.
- Instala navegadores con `npx @playwright/mcp install-browser chrome` (descarga desde internet). Si también descarga algo automáticamente al arrancar queda **A VERIFICAR**.
- Admite proxy (`--proxy-server`). Si las credenciales van en la URL del proxy, se pasan al navegador.
- **Modo HTTP/SSE** (`--port`): por defecto escucha en localhost. El ejemplo de Docker usa `--host 0.0.0.0` y el puerto 8931, "accesible por cualquier cliente MCP", y el README no menciona autenticación para ese modo.

### Sesión
| Modo | Qué implica |
|---|---|
| Por defecto (perfil persistente) | Los logins y el storage sobreviven entre usos |
| `--isolated` | El perfil vive en memoria y se pierde al cerrar el navegador |
| `--storage-state` | Contexto aislado que arranca con un estado cargado desde archivo |
| `--extension` | Se conecta al Chrome/Edge que ya tenés abierto, con **tus sesiones reales logueadas**. Desde la 0.0.86 rechaza cambios de cookies, pero **los clientes igual pueden leerlas** |
| `--cdp-endpoint` | Se conecta por CDP a un Chromium que ya está corriendo |

### Avisos de seguridad del propio README
- "Playwright MCP is **not** a security boundary." (no es una barrera de seguridad)
- `browser_run_code_unsafe` ejecuta JavaScript arbitrario en el proceso del servidor y el README lo describe como "**RCE-equivalent**" (equivale a ejecución remota de código).
- `--secrets` y `--redact-url-params` son "una comodidad, no una función de seguridad".
- `--no-sandbox` desactiva el sandbox del navegador.

## 4. Experiencia real: clase 2 (Codex + Playwright MCP sobre MiniModa)

**Qué funcionó:** el agente recorrió el catálogo y el carrito de MiniModa y guardó capturas de la navegación.

**Qué falló:** al repetir la navegación, **el carrito apareció vacío**. El estado se tuvo que verificar a mano.

**Lectura a partir de esta evaluación (hipótesis, A VERIFICAR):**
- No sé con qué opciones corrió el servidor en la clase 2 (`--isolated`, perfil persistente o `--storage-state`), ni dónde guarda MiniModa el carrito (localStorage, cookie o memoria). Las dos cosas quedan **A VERIFICAR**.
- Si el carrito vive en el storage del navegador y la segunda navegación usó un contexto nuevo o aislado, que aparezca vacío es lo esperable. Si vive en memoria de la página, cualquier recarga lo vacía.
- La lección para QA: **una captura no es una aserción**. El agente "vio" el carrito, pero nada comprobó que el estado se mantuviera. Eso es justamente lo que cubre un test con `expect`.

## 5. Beneficios

1. **Exploración rápida sin escribir código:** sirve para recorrer flujos nuevos de MiniModa, descubrir pantallas y estados, y dejar evidencia (capturas, consola, requests de red), como pasó en la clase 2.
2. **Usa la misma semántica que nuestros tests:** trabaja sobre el árbol de accesibilidad, igual que `getByRole` / `getByLabel`. Lo que el agente "ve" se parece a lo que ven nuestros locators, y con `--caps=testing` puede sugerir locators (`browser_generate_locator`).
3. **Origen y mantenimiento confiables:** es oficial de Microsoft, con licencia Apache-2.0, releases frecuentes y opciones explícitas para aislar la sesión (`--isolated`), limitar orígenes y deshabilitar capacidades.

## 6. Riesgos

1. **Estado no determinista:** la experiencia de la clase 2 lo mostró (el carrito vacío al repetir). El perfil persistente arrastra estado entre corridas y el modo aislado lo pierde. En ninguno de los dos casos hay aserciones que detecten el cambio.
2. **Superficie amplia y "no es una barrera de seguridad":** el agente puede ejecutar JS arbitrario (`browser_run_code_unsafe`, `browser_evaluate`), leer cookies, navegar a cualquier origen (las restricciones no cubren redirecciones) y escribir archivos en el workspace. Con `--extension` opera sobre las sesiones reales del usuario.
3. **Inmadurez y deriva de versiones:** la serie `0.0.x` depende de Playwright alpha, la documentación es inconsistente (`--caps`, `--user-data-dir`) y los cambios son frecuentes. Si no se fija la versión, `npx @playwright/mcp` puede traer otra distinta en cada uso.

## 7. Mitigaciones

| Riesgo | Mitigación |
|---|---|
| Estado no determinista | Usar `--isolated` para que cada sesión arranque limpia. Si hace falta un estado de partida, cargarlo con `--storage-state` desde un archivo de **datos ficticios**. Todo hallazgo sobre estado (carrito, orden) se confirma con un test Playwright y no con la captura |
| Superficie amplia | Nunca usar `--extension` ni `--cdp-endpoint` sobre el navegador personal. Limitar a `--allowed-origins https://minimoda-navy.vercel.app` (sabiendo que no es una barrera). No habilitar `--caps` que no se necesiten. Configurar el cliente para pedir aprobación antes de `browser_run_code_unsafe` / `browser_evaluate`. No usar `--allow-unrestricted-file-access`, `--no-sandbox` ni el modo HTTP en `0.0.0.0` |
| Secretos y datos | Solo demo MiniModa y datos ficticios, como pide `AGENTS.md`. No usar `--secrets` con claves reales. Mandar `--output-dir` a una carpeta ignorada por git y revisar las capturas antes de commitearlas |
| Versiones | Fijar la versión (`@playwright/mcp@0.0.86`) en la config del cliente MCP y revisar el changelog antes de subirla. Agregarlo como dependencia del repo requiere confirmación previa, según `AGENTS.md` |

## 8. Qué NO reemplaza del runner de tests (`npx playwright test`)

Playwright MCP es una herramienta para que **un agente maneje el navegador**. No es un framework de testing. No reemplaza:

- **Aserciones con reintento automático** (`expect(...).toBeVisible()`, `toHaveCount(0)`, `toHaveAttribute(...)`): el MCP muestra el estado, pero no falla si el estado es incorrecto. Las herramientas `browser_verify_*` son verificaciones puntuales del agente, no una suite.
- **Repetibilidad:** un spec corre igual siempre. El agente decide los pasos en cada corrida y puede tomar otro camino, como muestra el carrito vacío de la clase 2.
- **Aislamiento por test y fixtures:** contexto nuevo por test, `beforeEach` y `test.describe`.
- **Reporte, timeouts, reintentos, paralelismo y proyectos** (varios navegadores), configurados en `playwright.config`.
- **Integración en CI** con código de salida verde o rojo, que sirve para bloquear un merge.
- **Trazabilidad de casos:** IDs como PAGO-01 y PAGO-02 en el nombre del test, vinculados a `casos/pago.md`.
- **Revisión en git:** un spec se revisa en un PR; una sesión de agente no.

El propio README posiciona el MCP para "exploratory automation, self-healing tests, or long-running autonomous workflows", y para agentes de código recomienda la Playwright CLI por consumir menos tokens. No encontré en el README una comparación directa con el runner de tests ni con codegen: **A VERIFICAR**.

## 9. Decisión

**Adoptar con alcance limitado: solo para exploración y evidencia, no para regresión.**

- **Sí:** explorar flujos nuevos de MiniModa, reproducir bugs, juntar capturas y logs de consola o red, y sugerir locators que después se pasan a un spec a mano o con la skill `caso-a-playwright`.
- **No:** reemplazar la suite `tests/*.spec.ts`, ni dar por verificado un resultado (carrito, compra, errores de validación) sin un test con aserciones que pase en `npx playwright test`.
- **Config mínima propuesta (A VERIFICAR al probarla, porque no se instaló):**

  ```json
  {
    "mcpServers": {
      "playwright": {
        "command": "npx",
        "args": [
          "@playwright/mcp@0.0.86",
          "--isolated",
          "--allowed-origins", "https://minimoda-navy.vercel.app",
          "--output-dir", "./.mcp-output"
        ]
      }
    }
  }
  ```

- **Antes de usarla:** confirmar dónde guarda MiniModa el carrito, para entender el fallo de la clase 2, y confirmar los valores que acepta `--caps` en la versión fijada.

## 10. Qué se hizo y qué no

- **Hecho:** lectura del README, `package.json` y la página de releases del repo oficial.
- **No hecho:** no se instaló ni se ejecutó Playwright MCP. Las opciones, los nombres de herramientas no leídos textualmente, los valores por defecto marcados y la config propuesta están **sin probar**.
