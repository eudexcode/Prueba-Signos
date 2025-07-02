#!/bin/sh

echo "Esperando SQL Server..."
./wait-for-sqlserver.sh

echo "Iniciando backend..."
exec node server.js