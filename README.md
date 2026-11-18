# Velvet Bloom Cosmetics

Proyecto académico ficticio: tienda de maquillaje + panel administrativo y financiero.

## Inicio rápido (Windows / PowerShell)

1. Abre esta carpeta en Visual Studio Code.
2. Abre **Terminal > Nueva terminal**.
3. Ejecuta:

```powershell
npm.cmd install
npm.cmd run dev
```

4. Abre http://localhost:5173/ en Chrome.

Si utilizas CMD en lugar de PowerShell también puedes usar `npm` sin `.cmd`.

## Cómo probar la demostración

- En **Colección**, añade productos al carrito y confirma una compra ficticia.
- Pulsa **Área administrativa** y luego **Entrar al dashboard**. El acceso es deliberadamente simulado; NO protege datos reales.
- El dashboard y los módulos leen pedidos confirmados, precios y costos guardados.
- Usa el selector de mes. Las compras nuevas entran en el mes actual del computador.
- Puedes editar productos, existencias y gastos; las operaciones se guardan automáticamente en el `localStorage` de ese navegador.
- En **Resumen general > Restaurar demo** puedes recuperar los datos originales.

## Módulos

1. Tienda y carrito de compra ficticia.
2. Panel financiero: ingresos, costo de lo vendido, gastos fijos y utilidad/pérdida.
3. Gestión de productos y stock.
4. Gastos mensuales.
5. Mezcla de productos por unidades y contribución.
6. Punto de equilibrio por margen ponderado histórico: gastos fijos / (contribución / ingresos).
7. Meta de utilidad: (gastos fijos + utilidad objetivo) / margen ponderado.
8. Simulador de cantidades, precios y costos, sin afectar datos persistidos.
9. Historial de pedidos.

## Importante

- **Sin base de datos ni autenticación real todavía.** Este entregable es un frontend demostrativo y funcional. Cada navegador guarda datos por separado. No sirve aún para un negocio real ni para administrar compras desde varios dispositivos.
- Los datos originales son ficticios y se precargan. El inventario inicial ya descuenta las ventas precargadas.
- Los pedidos guardan **precio y costo al momento de la venta**, para mantener el histórico cuando cambien los precios.
- Los gastos fijos se interpretan como **valores mensuales recurrentes**, no por transacción. Los costos variables corresponden a productos vendidos, no a compras de inventario.
- El punto de equilibrio y la meta se calculan a partir de la mezcla efectivamente vendida en el mes seleccionado. Sin ventas o con margen no positivo se marca como no calculable.
- No incluye impuestos, fletes, devoluciones, comisiones, depreciación, cambios de stock entre dispositivos ni cierre contable. Son aspectos a ampliar en la etapa de backend.
- Las imágenes y fuentes se cargan desde internet. Puedes reemplazar imágenes modificando el campo URL de cada producto.
- Para la siguiente etapa: Supabase (PostgreSQL, autenticación segura y transacciones de pedidos/stock en servidor).

## Estructura

```text
velvet-bloom-cosmetics/
  index.html
  package.json
  vite.config.js
  public/
  src/
    main.jsx
    App.jsx
    data.js
    styles.css
```
