const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Producto {
        id: ID
        nombre: String
        precio: Float
        categoria: String
        stock: Int
    }

    type Query {
        getProductos: [Producto]
    }

    input ProductoInput {
        nombre: String!
        precio: Float!
    }

    type Mutation {
        createProducto(input: ProductoInput): Producto
    }
`);

module.exports = schema;