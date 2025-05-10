PROJECT URL:https://roadmap.sh/projects/multi-container-service     ---only first part
STEPS TO RUN 
Step-by-Step Instructions to Run the Project
1. Install Docker and Docker Compose
Ensure that you have Docker and Docker Compose installed on your system.

For Docker installation, follow the instructions on the official Docker website.

Docker Compose comes bundled with Docker Desktop, so ensure that Docker is installed first.

2. Clone the Repository
Clone the repository containing the project to your local machine using the following command:

bash
Copy
Edit
git clone <your-repository-url>
Navigate into the project directory:

bash
Copy
Edit
cd <project-directory>
3. Build and Start the Containers
Run the following command to build and start the Docker containers:

bash
Copy
Edit
docker-compose up --build
This will build the Docker images for the api and mymongo1 services and start the containers.

It will map port 3000 for the API and port 27017 for MongoDB as per your configuration.

Note: The first time you run this command, Docker will download necessary images, which may take a few minutes.

4. Verify Containers are Running
After running the containers, check if they are successfully running:

bash
Copy
Edit
docker ps
This command will list all running containers. Ensure that both mymongo1 and api containers are listed.

5. Access the API
You can now access the API by visiting:

arduino
Copy
Edit
http://localhost:3000
You can test the API endpoints like GET /todos to fetch all todos or POST /todos to create a new todo.

6. Stopping the Containers
To stop the containers, use:

bash
Copy
Edit
docker-compose down
This command stops and removes the containers but keeps the MongoDB data.

7. Reset MongoDB Data (Optional)
If you need to completely reset the MongoDB data (including volumes), run the following command:

bash
Copy
Edit
docker-compose down -v
This will remove the volumes along with the containers.

8. Check Logs (If Needed)
If you face any issues or need to check the logs for troubleshooting, you can check the logs of specific containers:

For the api container:

bash
Copy
Edit
docker-compose logs api
For the mymongo1 container:

bash
Copy
Edit
docker-compose logs mymongo1
