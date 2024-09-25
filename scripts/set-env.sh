
echo "
PUBLIC_BUILD_NUMBER=$BUILD_NUMBER
PUBLIC_BUILD_DATE=$(date +"%Y-%m-%d %H:%M:%S")" >> .env.production

echo "Variáveis de produção definidas"
