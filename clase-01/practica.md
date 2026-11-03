# Práctica clase 01: casos del registro de MiniModa con IA

**Sitio:** https://minimoda-navy.vercel.app/registro


## 1. Preparación
- Navegador y fecha: Chrome, 03/11/2026
- Recorrido del formulario: Nombre, Email, Contraseña (mín. 8), Confirmar contraseña, Edad (entero 13–120), País (select con 9 países), checkbox "Acepto los términos y condiciones" + link a /legal/terminos. La validación es por JavaScript (el form tiene `novalidate`, ningún campo tiene `required`/`min`/`max` en HTML). Debajo hay un bloque "Ingresar" con login simulado.

## 2. Superficie elegida
- Elegí (chat o cowork): Cowork
- Por qué: Cowork puede abrir la página real en el navegador, recorrer el formulario y probar los datos antes de escribir los casos, en vez de suponer cómo funciona. Eso reduce los inventos (mensajes de error, reglas) y me deja el resultado verificado contra el sitio.

## 3. Preguntas a Gemini
| # | Pregunta | Respuesta (resumen) | ¿Acierto o error/invento? |
|---|----------|---------------------|---------------------------|
| 1 | ¿Qué campos pide el formulario de registro de https://minimoda-navy.vercel.app/registro? | Nombre (o usuario), Email, Edad (o fecha de nacimiento), Contraseña, Confirmación "(si aplica)", checkbox de términos. | Error parcial: omite **País**, duda entre alternativas ("o fecha de nacimiento", "si aplica") en vez de leer la página. |
| 2 | ¿Cuál es el largo mínimo de la contraseña y qué edad se permite? | Contraseña mínimo 8 (agrega "suele ser entre 6 y 8"). Edad mínima 18. | Contraseña: acierto. Edad: **invento** (es entero entre 13 y 120; no menciona máximo). |
| 3 | ¿Qué pasa si no acepto los términos? | Bloquea el envío y muestra un error "por ejemplo: Debes aceptar los términos y condiciones para continuar". | Comportamiento correcto, pero el mensaje es inventado (el real es "Debés aceptar los términos." + "Revisá los campos marcados."). |

- Un acierto: El mínimo de 8 caracteres para la contraseña y que sin aceptar términos no se crea la cuenta.
- Un error o invento: Dice que la edad mínima es 18 (en realidad es 13, con máximo 120) y omite el campo País. Además responde con supuestos genéricos ("si aplica", "por ejemplo", "en escenarios típicos") en vez de verificar la página: suena seguro pero no la leyó.

## 4. Primer modo
- Superficie y modo: Cowork (Claude en la extensión de Chrome), modo agente: navega y ejecuta acciones en el navegador.
- Prompt: el de la plantilla.
- Qué devolvió: Antes de escribir los casos, ejecutó 13 escenarios reales en el formulario con datos inventados (ana.prueba@example.com). Reglas y mensajes confirmados:

| Escenario | Resultado real |
|---|---|
| Todo vacío | 7 errores: "El nombre es obligatorio.", "El email es obligatorio.", "La contraseña es obligatoria.", "Confirmá tu contraseña.", "La edad es obligatoria.", "Seleccioná un país.", "Debés aceptar los términos." + banner "Revisá los campos marcados." |
| Nombre solo espacios | "El nombre es obligatorio." (hace trim) |
| Email `ana.prueba@` | "El formato de email no es válido." |
| Contraseña 7 caracteres | "La contraseña debe tener al menos 8 caracteres." |
| Contraseña 8 caracteres | OK |
| Confirmación distinta | "Las contraseñas no coinciden." |
| Edad 12 / 121 | "La edad debe estar entre 13 y 120." |
| Edad 13 / 120 | OK |
| Edad 13.5 | "La edad debe ser un número entero." |
| Sin términos | "Debés aceptar los términos." |
| Todo válido | "¡Registro exitoso! Bienvenido/a a MiniModa, Ana Prueba. Te enviamos un email de bienvenida (ver Bandeja)." |

No inventó mensajes porque los leyó de la página; los campos con error quedan con `aria-invalid="true"`.

## 5. Otra superficie: comparación en 3 líneas (Cowork vs. Claude chat)
1. Velocidad: Chat respondió más rápido porque solo leyó el HTML; Cowork tardó más porque ejecutó 13 escenarios reales en el navegador antes de escribir.
2. Calidad: Chat dio 8 casos bien elegidos (borde, negativos y camino feliz) con datos concretos, pero con resultado esperado genérico ("un error en el campo") y CT-01 mezcla dos bordes en un caso; Cowork entregó casos con los textos exactos de error y éxito, verificados ejecutándolos.
3. Inventos: ninguno en ninguna de las dos. Chat aclaró que no conocía los mensajes literales y los dejó para registrar al ejecutar; Gemini, en cambio, inventó la edad mínima (18) y el mensaje de términos.

## 6. Mis 3 mejores casos (cargados en Qase, proyecto MiniModa)
Captura de la suite en Qase con tus casos: `evidencias/qase-suite-casos.png`

IDs en Qase: MINIMODA-6, MINIMODA-9 y MINIMODA-10.

### Caso 1 (MINIMODA-6): Registro: alta exitosa con datos válidos
- Prioridad / tipo: High / Functional
- Precondiciones: Estar en https://minimoda-navy.vercel.app/registro con el formulario vacío.
- Pasos:
  1. Nombre: `Ana Prueba`
  2. Email: `ana.prueba@example.com`
  3. Contraseña: `Clave1234`
  4. Confirmar contraseña: `Clave1234`
  5. Edad: `30`
  6. País: `Argentina`
  7. Marcar "Acepto los términos y condiciones"
  8. Clic en "Crear cuenta"
- Resultado esperado: Se muestra "¡Registro exitoso! Bienvenido/a a MiniModa, Ana Prueba. Te enviamos un email de bienvenida (ver Bandeja)." y ningún campo queda marcado con error.
- Evidencia: `evidencias/qase-MM-6-registro-alta-exitosa.png`

### Caso 2 (MINIMODA-9): Registro: contraseña de 7 caracteres (límite inferior - 1)
- Prioridad / tipo: High / Boundary
- Precondiciones: Estar en /registro con el formulario vacío.
- Pasos:
  1. Completar los campos con los datos válidos del Caso 1, salvo:
  2. Contraseña: `Clave12` (7 caracteres)
  3. Confirmar contraseña: `Clave12`
  4. Clic en "Crear cuenta"
- Resultado esperado: No se registra. Aparece "Revisá los campos marcados." y bajo Contraseña "La contraseña debe tener al menos 8 caracteres.". (Control: con `Clave123`, 8 caracteres, el registro es exitoso.)
- Evidencia: `evidencias/qase-MM-9-registro-password-7.png`

### Caso 3 (MINIMODA-10): Registro: edad 12 (límite inferior - 1)
- Prioridad / tipo: High / Boundary
- Precondiciones: Estar en /registro con el formulario vacío.
- Pasos:
  1. Completar los campos con los datos válidos del Caso 1, salvo:
  2. Edad: `12`
  3. Clic en "Crear cuenta"
- Resultado esperado: No se registra. Aparece "Revisá los campos marcados." y bajo Edad "La edad debe estar entre 13 y 120.". (Control: con `13` el registro es exitoso.)
- Evidencia: `evidencias/qase-MM-10-registro-edad-12.png`

## 7. Mapa del harness
| Pieza | En lo que usé |
|-------|---------------|
| Modelo | Claude Opus 5.5 (`claude-opus-5-5`) |
| App | Claude, superficie Cowork desde la extensión Claude in Chrome |
| Harness | Claude Agent SDK (el loop de agente de Cowork: herramientas de navegador, archivos y shell) |
| MCP | claude-in-chrome (navegar, leer la página, ejecutar JS, capturas) |
| Skill | Ninguna |

## 8. Entrega
- Link de tu repo (pegalo también en el Telegram): https://github.com/micaelajara/minimoda-test
