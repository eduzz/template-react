echo "
REACT_APP_BUILD_NUMBER=$BUILD_NUMBER
REACT_APP_BUILD_DATE=$(date +"%Y-%m-%d %H:%M:%S")" > .env

docker system prune -a --volumes -f
npm cache clean --force

cat .env
