set -e

echo 'Generating docker...'
if [ "$1" = '--production' ] || [ "$1" = '-p' ]; then
  echo 'BUILDING FOR PRODUCTION...'
  docker build -t danieloprado/church-api:web -f docker/prod/Dockerfile .
  # docker push danieloprado/church-api:web
  exit
fi

echo 'BUILDING FOR HOMOLOG...'
docker build -t danieloprado/church-api:web-hml -f docker/prod/Dockerfile .
# docker push danieloprado/church-api:web-hml