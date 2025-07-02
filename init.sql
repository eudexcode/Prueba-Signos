IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Productos')
BEGIN
    CREATE DATABASE Productos;
END
GO

USE Productos;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'products')
BEGIN
    CREATE TABLE products (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(255),
        precio DECIMAL(10,2),
        categoria NVARCHAR(100),
        stock INT
    );
END
GO

-- Primero creas el login a nivel servidor
IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE name = 'sa')
BEGIN
    CREATE LOGIN sa WITH PASSWORD = 'Str0ng_P4ssw0rd!';
END
GO

-- Luego creas el usuario dentro de la base
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE name = 'sa')
BEGIN
    CREATE USER prueba FOR LOGIN sa;
    EXEC sp_addrolemember N'db_owner', N'sa';
END
GO
