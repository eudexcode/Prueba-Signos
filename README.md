# Proyecto Backend con Node.js, Express, MSSQL y GraphQL

Este proyecto es una API que permite gestionar productos usando REST y GraphQL. Usa Docker para levantar un contenedor de SQL Server y otro para el backend Node.js.

---

## Clonar el repositorio

git clone https://github.com/eudexcode/Prueba-Signos.git
cd Prueba-Signos

---

# Levantar el entorno con Docker. (Asegurate de tener Docker Desktop instalado y tenerlo abierto)

docker-compose up --build

---

# Probar la API Rest

Para probar la API Rest, recomendable descargar Postman (Link: https://www.postman.com/downloads/)

La ruta a usar para probar la API:

http://localhost:3000/api/productos

Para hacer el POST es necesario llenar este objeto en el body:

{
    "nombre": "String",
    "precio": Float,
    "categoria": "String",
    "stock": Integer
}

Igual para el PUT incluso la ruta sea con el ID, es necesario poner tener el objeto con la informacion del producto para alterar el producto que creaste

http://localhost:3000/api/productos/1

{
    "nombre": "String",
    "precio": Float,
    "categoria": "String",
    "stock": Integer
}

Y en dado caso de querer hace un GET o DELETE by ID usar siguiente ruta, tomando en cuenta que luego del / de productos se pondra el ID del producto que desea alterar

http://localhost:3000/api/productos/#idnumber

En dado caso de querer obtener todos los productos o elminarlos todos, es solo cambiar el metodo HTTP y ejecutar la ruta 

http://localhost:3000/api/productos

---

# Probar en GraphQL

Una vez esten los contenedores arriba usar: http://localhost:3000/graphql 
Para probar en graphql igual te dejo el query que puedes usar para probarlo:
query {
  productos {
    id
    nombre
    precio
    categoria
    stock
  }
}



