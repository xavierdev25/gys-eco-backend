@echo off
echo Intentando conectar con diferentes contraseñas comunes...
echo.

set passwords=postgres admin root 123456 password 12345678

for %%p in (%passwords%) do (
    echo Probando contraseña: %%p
    node -e "const {Client}=require('pg');const c=new Client({host:'localhost',port:5432,user:'postgres',password:'%%p',database:'postgres'});c.connect().then(()=>{console.log('✅ EXITO con contraseña: %%p');process.exit(0);}).catch(()=>{});" 2>nul && goto :found
)

echo.
echo ❌ Ninguna contraseña común funcionó.
echo Por favor, verifica la contraseña en pgAdmin o tu gestor de BD.
goto :end

:found
echo.
echo Actualiza tu archivo .env con esta contraseña.

:end
