// Clase 6 · Prueba de carga de GET /productos/buscar?q=remera
// Objetivo (contrato, paths./productos/buscar.get.description): p95 < 300 ms con 20 usuarios a la vez.
// Correr SOLO contra la API local. Ejemplo: k6 run -e VUS=5 carga.js
import http from 'k6/http';
import { check, sleep } from 'k6';

// URL base por variable de entorno; por defecto, la API en esta compu
const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';
// Cantidad de usuarios virtuales: 1, 5 o 20 según la corrida
const VUS = Number(__ENV.VUS || 20);

export const options = {
  // Perfil: rampa de 0 a VUS en 10 s, 30 s sostenidos y bajada en 5 s
  stages: [
    { duration: '10s', target: VUS },
    { duration: '30s', target: VUS },
    { duration: '5s', target: 0 },
  ],
  // Umbrales del objetivo: menos de 1 % de errores y p95 menor a 300 ms
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<300'],
  },
};

export default function () {
  // Misma solicitud que B01 en la colección
  const res = http.get(`${BASE_URL}/productos/buscar?q=remera`);

  // Los mismos dos checks que las aserciones de B01
  check(res, {
    'estado 200': (r) => r.status === 200,
    'productos es una lista': (r) => {
      try { return Array.isArray(r.json('productos')); } catch (e) { return false; }
    },
  });

  // Pausa de 1 s entre iteraciones, como un usuario real
  sleep(1);
}
