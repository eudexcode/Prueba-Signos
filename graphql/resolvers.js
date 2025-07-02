module.exports = (pool) => ({
    getProductos: async () => {
        const result = await pool.request().query('SELECT * FROM products');
        return result.recordset;
    },

    createProducto: async ({ input }) => {
        const { nombre, precio, categoria, stock } = input;

        if(!nombre || typeof nombre !== 'string' || !precio || typeof precio !== 'number' || precio <= 0 || !categoria || typeof categoria !== 'string' || !stock || typeof stock !== 'number') {
            return reject(new Error('Validacion fallida: los campos son requeridos.'));
        }
           
        const result = await pool.request()
            .input('nombre', sql.VarChar, nombre)
            .input('precio', sql.Float, precio)
            .input('categoria', sql.VarChar, categoria)
            .input('stock', sql.Int, stock)
            .query('INSERT INTO products (nombre, precio, categoria, stock) OUTPUT INSERTED.id VALUES (@nombre, @precio, @categoria, @stock)');

        return {
            id: result.recordset[0].id,
            nombre,
            precio
        };
    }
});