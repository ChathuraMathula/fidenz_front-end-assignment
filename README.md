# Weather App

## Installation steps
01. Install and run docker engine on your PC.
02. Run `docker build -t my-weather-app:latest .` 
command in the project root directory to build the docker image using docker file.
03. Run `docker run -d -p 3000:8080 my-weather-app:latest` 
command to start the container from the created image in detached mode. change port number 3000 (host port number) to your preferred port.
04. Finally, visit http://localhost:3000/ to start the application.