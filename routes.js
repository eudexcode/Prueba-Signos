const express = require('express');
const sql = require('mssql');

//Validacion de entrada
function validacion(body) {
  const { nombre, precio, categoria, stock } = body;
  if (!nombre || typeof nombre !== 'string') {
    return 'El nombre del producto es obligatorio y debe ser una cadena de texto.';
  }
  if (precio === undefined || typeof precio !== 'number' || precio <= 0) {
    return 'El precio del producto es obligatorio y debe ser un número mayor a 0.';
  }
  if(categoria === undefined || typeof categoria !== 'string') {
    return 'Cada producto necesita tener una categoria asignada.'
  }
  if(stock === undefined || typeof stock !== 'number'){
    return 'El Stock no puede ser nulo, guarde con 0 de no haber disponible en almacen.'
  }
  return null;
}

// Exportar funcion del pool
module.exports = (pool) => {
  const productos = express.Router();

  // GET
  productos.get('/', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM products');
      res.status(200).json(result.recordset);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener productos', detail: err.message });
    }
  });

  // GET/:id
  productos.get('/:id', async (req, res) => {
    try {
      const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM products WHERE id = @id');

      if (result.recordset.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json(result.recordset[0]);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener producto', detail: err.message });
    }
  });

  // POST
  productos.post('/', async (req, res) => {
    const error = validacion(req.body);
    if (error) return res.status(400).json({ error });

    const { nombre, precio, categoria, stock } = req.body;

    try {
      const result = await pool.request()
        .input('nombre', sql.VarChar, nombre)
        .input('precio', sql.Float, precio)
        .input('categoria', sql.VarChar, categoria)
        .input('stock', sql.Int, stock)
        .query('INSERT INTO products (nombre, precio, categoria, stock) OUTPUT INSERTED.id VALUES (@nombre, @precio, @categoria, @stock)');

      res.status(201).json({
        message: 'Producto creado exitosamente',
        productoId: result.recordset[0].id
      });
    } catch (err) {
      res.status(500).json({ error: 'Error al insertar producto', detail: err.message });
    }
  });

  // UPDATE
  productos.put('/:id', async (req, res) => {
    const error = validacion(req.body);
    if (error) return res.status(400).json({ error });

    const { nombre, precio, categoria, stock } = req.body;

    try {
      const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .input('nombre', sql.VarChar, nombre)
        .input('precio', sql.Float, precio)
        .input('categoria', sql.VarChar, categoria)
        .input('stock', sql.Int, stock)
        .query('UPDATE products SET nombre = @nombre, precio = @precio, categoria = @categoria, stock = @stock WHERE id = @id');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json({ message: 'Producto actualizado correctamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar producto', detail: err.message });
    }
  });

  // DELETE
  productos.delete('/:id', async (req, res) => {
    try {
      const result = await pool.request()
        .input('id', sql.Int, req.params.id)
        .query('DELETE FROM products WHERE id = @id');

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar producto', detail: err.message });
    }
  });

  return productos;
};
