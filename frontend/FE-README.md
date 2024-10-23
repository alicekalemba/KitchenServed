# Kitchen Served Frontend

## Run: 
cd `frontend`
install dependencies - `npm install`
start the app - `npm start`


## Running with Docker
Build and run:
`docker build --platform linux/amd64 --no-cache -t kitchen-served-fe .`
`docker run -p 3000:3000 kitchen-served-fe`

### Push image to ecr
Authenticate Docker to ECR registry:
`aws ecr --profile=qube get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Tag the Docker image:
`docker tag kitchen-served-fe:latest 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-fe-latest`

Push to ECR:
`docker push 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-fe-latest`


Access the app on `44.203.43.176`. sample curl:
`curl --location --request GET 'http://44.203.43.176:8000/recipes'`

### Run in ec2
- See TF-README.md for instructions on how to run the BE and FE apps in an EC2 instance.

## Notes (Do not run the commands in this section. They are for reference only.)
To build the production app, run `npm run build`. it uses the .env.production file for environment variables by default.

app was created by `npx create-react-app menu-app`
dependencies added: `npm install tailwindcss lucide-react`, `npm install axios`, `npm install react-hot-toast`
tail wind css setup: `npx tailwindcss init -p`
