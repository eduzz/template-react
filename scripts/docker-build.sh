set -e

cp ./docker/prod/.dockerignore .dockerignore

echo 'Generating docker...'
if [ "$1" = '--production' ] || [ "$1" = '-p' ]; then
  echo 'BUILDING FOR PRODUCTION...'
  docker build -t infraeduzz/nutror-front:producer -f docker/prod/Dockerfile .
  # docker push infraeduzz/nutror-front:producer
else
  echo 'BUILDING FOR HOMOLOG...'
  docker build -t infraeduzz/nutror-front:producer-hml -f docker/prod/Dockerfile .
  # docker push infraeduzz/nutror-front:producer-hml
fi

rm .dockerignore