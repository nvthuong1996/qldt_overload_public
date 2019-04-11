#!/bin/bash
sudo rm -rf db_data
sudo docker-compose down
sudo docker system prune -f
sudo docker-compose build
sudo docker-compose up