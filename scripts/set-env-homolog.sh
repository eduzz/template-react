cat .env.homolog > .env.production

echo "
PUBLIC_BRANCH_NAME=$1
PUBLIC_BUILD_NUMBER=$2
PUBLIC_BUILD_DATE=\"$(date +"%Y-%m-%d %H:%M:%S")\"
" >> .env.production

echo "Variáveis de homologação definidas"
