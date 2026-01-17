Web Application Deployment on AWS (ECS Fargate)
This project demonstrates the deployment of an existing static web application using a containerized, cloud-native AWS architecture. The focus is on containerization, cloud deployment, networking, and scalability using AWS ECS (Fargate) and an Application Load Balancer.

📌 Project Overview
Source: Static web application cloned from a GitHub repository.

Architecture: Containerized using Docker, stored in Amazon ECR, and orchestrated via Amazon ECS (Fargate).

Networking: Traffic is managed and routed via an Application Load Balancer (ALB).


Goal: To establish a scalable, serverless deployment pipeline rather than focus on frontend development.

🛠 Tech Stack
GitHub: Source code repository.

Docker: Containerization platform (installed on an EC2 build server).

Amazon EC2: Virtual server used as a build environment for Docker images.

Amazon ECR: Elastic Container Registry for storing Docker images.

Amazon ECS (Fargate): Serverless container orchestration service.

Application Load Balancer (ALB): Manages traffic routing, health checks, and high availability.


AWS CLI: Command-line tool for interacting with AWS services.

🚀 Deployment Guide
Step 1: Launch Build Server (EC2)

Launch Instance: Go to the AWS EC2 Console and launch a new instance.


AMI: Select Ubuntu (AWS optimized, stable, Docker-friendly).


Instance Type: Select t2.micro or t3.micro (Free-tier eligible).


Key Pair: Create a new key pair named deployment-project-key (.pem) and save it safely.

Network Settings: Use the default VPC and a public subnet. Enable "Auto-assign public IP".

Security Group: Create a new security group allowing:

SSH (22): From 0.0.0.0/0 (or your IP).


HTTP (80): From 0.0.0.0/0 (for testing).

Step 2: Environment Setup (Inside EC2)

Connect: SSH into your EC2 instance or use EC2 Instance Connect.

Update System:

Bash

sudo su
apt update
Install Docker:

Bash

# Install required packages
apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository and install Docker Engine
# (Refer to official Docker docs or PDF for full GPG/Repo commands)
apt install -y docker-ce docker-ce-cli containerd.io
Enable Docker and allow non-root access:

Bash

systemctl start docker
systemctl enable docker
usermod -aG docker ubuntu
# Disconnect and reconnect for permission changes to take effect
.

Step 3: Dockerize the Application
Clone Repository:

Bash

mkdir my-website && cd my-website
sudo apt install git -y
git clone https://github.com/kayal-del/frontend-aitech.git . 
# (Note the dot at the end to clone into current dir)
.
+1

Create Dockerfile: Create a file named Dockerfile with the following content:

Dockerfile

FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
.

Build & Test:

Bash

docker build -t frontend-aitech .
docker run -d -p 80:80 frontend-aitech

Visit your EC2 Public IP in a browser to verify the site is running..

Step 4: Push to Amazon ECR
Create Repository: Go to the AWS Console > ECR > "Create repository". Name it frontend-aitech, set visibility to Private.

Install AWS CLI v2 on your EC2 instance if not installed:

Bash

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
apt install unzip -y
unzip awscliv2.zip
sudo ./aws/install
.


Configure AWS CLI: Run aws configure and enter your IAM Access Key ID, Secret Access Key, and Region (ap-south-1).

Login & Push:

Bash

# Login Docker to ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <YOUR_ACCOUNT_ID>.dkr.ecr.ap-south-1.amazonaws.com

# Tag the image
docker tag frontend-aitech:latest <YOUR_ECR_URI>:latest

# Push to ECR
docker push <YOUR_ECR_URI>:latest
.
+2

Step 5: Orchestrate with ECS & ALB
Create Cluster: In ECS Console, create a cluster named frontend-aitech-cluster. Select Fargate infrastructure.

Task Definition:

Type: Fargate

OS: Linux

Resources: 0.25 vCPU, 0.5 GB Memory.


Container: Name frontend-aitech, Image URI (from ECR), Port 80.

Target Group:

Type: IP addresses.

Protocol: HTTP / Port 80.


VPC: Default VPC.
+1

Application Load Balancer (ALB):

Scheme: Internet-facing.

Listener: HTTP Port 80 forwarding to the Target Group created above.


Subnets: Select at least two public subnets.
+2

Create Service:

Go to your Cluster > Create Service.

Launch Type: Fargate.

Task Definition: frontend-aitech-task.

Desired Tasks: 1.

Networking: Choose Public Subnets, Security Group (Allow HTTP port 80).


Load Balancing: Select "Application Load Balancer" and attach the target group.
+3

✅ Verification
Wait for the ECS Service status to reach RUNNING.

Go to the Load Balancers section in the EC2 Console.

Copy the DNS Name of your ALB (e.g., frontend-aitech-alb-xxxx.ap-south-1.elb.amazonaws.com).

Open the DNS link in your browser to view the live website.