REST API Deployment on AWS (ECS Fargate)

This repository demonstrates end-to-end deployment of a containerized Node.js REST API on AWS using modern DevOps practices.
The application is built with Express.js, containerized using Docker, stored in Amazon ECR, and deployed on Amazon ECS (Fargate) behind an Application Load Balancer (ALB).

The setup follows a production-ready, scalable, and highly available architecture.

Architecture Overview
Client

  │
  
  ▼
  
Application Load Balancer (ALB)

  │
  
  ▼
  
ECS Fargate Service

  │
  
  ▼
  
Docker Container (Node.js REST API)



Tech Stack:

Node.js (Express.js) – REST API development

Docker – Application containerization

Amazon EC2 – Docker image build server

Amazon ECR – Container image registry

Amazon ECS (Fargate) – Serverless container orchestration

Application Load Balancer (ALB) – Traffic routing and health checks

AWS VPC and Security Groups – Networking and access control

AWS CLI – Image push and infrastructure interaction



Project Structure
rest-api/

│── app.js

│── package.json

│── package-lock.json

│── Dockerfile

│── README.md



REST API Endpoints
Method	Endpoint	Description

GET	/	API welcome message

GET	/health	Health check endpoint

GET	/api/users	Sample users data


Sample Health Check Response
{
  "status": "UP"
}
Docker Configuration



Dockerfile


FROM node:18-alpine
WORKDIR /app



COPY package*.json ./
RUN npm install --only=production



COPY . .



EXPOSE 3000
CMD ["node", "app.js"]
AWS Deployment Workflow




1. EC2 (Docker Build Server)

Launch an Ubuntu EC2 instance

Install Docker

Build the REST API Docker image


2. Amazon ECR

Create a private ECR repository

Authenticate Docker with ECR

Tag and push the image


3. Amazon ECS (Fargate)

Create an ECS task definition

Configure CPU and memory

Enable CloudWatch logging


4. Application Load Balancer

Configure the ALB

Create a target group

Set the health check path to /health


5. ECS Service

Attach the service to the ALB

Maintain desired task count

Automatically replace failed containers

Deployment Verification

Copy the Application Load Balancer DNS name




Access the API:

http://<ALB-DNS>/health



Expected response:

{
  "status": "UP"
}




Key Highlights

* Fully serverless container deployment using ECS Fargate

* No Docker Desktop required

* Secure and scalable AWS architecture

* CloudWatch logging enabled

* Load-balanced and fault-tolerant REST API





License

This project is created for learning and demonstration purposes.





Author

Jeevadharsan B
DevOps | Cloud | AWS | Docker
