#!/bin/sh

echo "Esperando a que SQL Server esté listo en $DB_SERVER:1433..."

while ! nc -z "$DB_SERVER" 1433; do
  echo "Esperando conexión..."
  sleep 2
done

echo "SQL Server disponible!"