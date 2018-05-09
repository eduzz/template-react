set -e

cp ./docker/prod/.dockerignore .dockerignore

echo 'Generating docker...'
if [ "$1" = '--production' ] || [ "$1" = '-p' ]; then
  echo 'BUILDING FOR PRODUCTION...'
  docker build -t danieloprado/church-api:web -f docker/prod/Dockerfile .
  # docker push danieloprado/church-api:web
else
  echo 'BUILDING FOR HOMOLOG...'
  docker build -t danieloprado/church-api:web-hml -f docker/prod/Dockerfile .
  # docker push danieloprado/church-api:web-hml
fi

rm .dockerignore