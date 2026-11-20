// Casos en casos/pago.md
import { test, expect, type Page } from "@playwright/test";

// Casos: casos/pago.md · Demo MiniModa · datos ficticios (no son datos reales de pago).
const TIENDA_URL = "https://minimoda-navy.vercel.app/tienda";
const PRODUCTO = "Gorrito de Lana Osito";

const datosBase = {
  nombre: "Ana Prueba",
  direccion: "Calle Falsa 123",
  email: "ana.prueba@example.com",
  pais: "Argentina",
  tarjeta: "4111111111111111",
  vencimiento: "12/30",
  cvv: "123",
};

// Precondición común: carrito con al menos un producto y checkout abierto desde la tienda.
async function abrirCheckoutConProducto(page: Page) {
  await page.goto(TIENDA_URL);
  await page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: PRODUCTO }) })
    .getByRole("button", { name: "Agregar al carrito" })
    .click();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("link", { name: "Checkout" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Checkout", level: 1 }),
  ).toBeVisible();
}

async function completarYConfirmar(page: Page, datos: typeof datosBase) {
  await page.getByLabel("Nombre", { exact: true }).fill(datos.nombre);
  await page.getByLabel("Dirección", { exact: true }).fill(datos.direccion);
  await page.getByLabel("Email", { exact: true }).fill(datos.email);
  await page.getByLabel("País de envío").selectOption(datos.pais);
  await page.getByLabel("Número de tarjeta").fill(datos.tarjeta);
  await page.getByLabel("Vencimiento (MM/AA)").fill(datos.vencimiento);
  await page.getByLabel("CVV", { exact: true }).fill(datos.cvv);
  await page.getByRole("button", { name: "Confirmar compra" }).click();
}

test.describe("Checkout MiniModa · pago", () => {
  test.beforeEach(async ({ page }) => {
    await abrirCheckoutConProducto(page);
  });

  test("PAGO-01 · compra válida muestra la confirmación con número de orden", async ({
    page,
  }) => {
    await completarYConfirmar(page, datosBase);

    // El toast «Listo, lo sumamos al carrito.» también es role=status: filtramos por texto.
    const confirmacion = page
      .getByRole("status")
      .filter({ hasText: "Compra confirmada" });
    await expect(confirmacion).toBeVisible();
    await expect(confirmacion).toContainText(/Orden MM-\d+/);
    await expect(confirmacion).toContainText("Envío a Argentina");
  });

  test("PAGO-02 · CVV de 2 dígitos muestra error y no confirma la compra", async ({
    page,
  }) => {
    await completarYConfirmar(page, { ...datosBase, cvv: "12" });

    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "El CVV debe tener 3 o 4 dígitos." }),
    ).toBeVisible();
    await expect(page.getByLabel("CVV", { exact: true })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    // Se evalúa después de que el error ya es visible, así que el formulario ya fue procesado.
    await expect(
      page.getByRole("status").filter({ hasText: "Compra confirmada" }),
    ).toHaveCount(0);
  });
});
