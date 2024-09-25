
echo "Set envs........."
mainFile='index'
if [ "$MAINTENANCE" = "true" ]; then
  mainFile="maintenance"
fi
export MAIN_FILE=$mainFile
envsubst  '$MAIN_FILE' < ./root/nginx.conf > /etc/nginx/conf.d/default.conf
echo "Starting nginx"
nginx -g "daemon off;"