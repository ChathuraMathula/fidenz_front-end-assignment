# Weather App

Installation steps
01. change the API key in .env file of the project root folder to your key taken from openweathermap.org
02. run `docker build -t my-weather-app:latest .` 
to build the docker image using docker file.
03. run `docker run -d -p 3000:8080 my-weather-app:latest` 
to start the container from the created image in detached mode. change port number 3000 to your preferred port.
03. Finally, visit http://localhost:3000/ to start the application.