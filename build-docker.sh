docker-compose build
docker-compose run webpacker rake db:create
docker-compose run webpacker rake db:migrate
