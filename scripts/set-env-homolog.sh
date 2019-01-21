cat .env.homolog > .env.production.local

echo "
REACT_APP_BRANCH_NAME=$1
REACT_APP_BUILD_NUMBER=$2
REACT_APP_BUILD_DATE=\"$(date +"%Y-%m-%d %H:%M:%S")\"
" >> .env.production.local

echo "Variáveis de homologação definidas"
cat .env.production.local
