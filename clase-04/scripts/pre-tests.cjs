const fs = require('node:fs');
const path = require('node:path');
function deny(reason) {
  console.log(JSON.stringify({ hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny', permissionDecisionReason: reason
  }}));
}
try {
  const event = JSON.parse(fs.readFileSync(0, 'utf8'));
  const input = event.tool_input || {};
  const root = process.cwd();
  const file = path.resolve(root, input.file_path || '.');
  const relative = path.relative(root, file);
  const inTests = relative.startsWith('tests' + path.sep);
  let reason = '';
  if (event.tool_name === 'Bash') {
    reason = 'Bash del agente bloqueado en este ejemplo. Revisá y corré manualmente.';
  } else if (inTests && ['Edit', 'Write'].includes(event.tool_name)) {
    const text = String(input.new_string ?? input.content ?? '');
    if (/test\s*\.\s*(skip|fixme)\b/.test(text)) {
      reason = 'No saltees tests para conseguir verde.';
    } else if (!text.trim()) {
      reason = 'No se permiten ediciones vacías de tests en este ejemplo.';
    } else if (event.tool_name === 'Write' && fs.existsSync(file)) {
      reason = 'Revisá un diff: no se sobreescriben tests existentes con Write.';
    }
  }
  if (reason) deny(reason);
} catch {
  deny('Entrada de hook inválida: detené la acción y revisá la configuración.');
}
