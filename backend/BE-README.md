# Kitchen Served Backend

cd `backend`
create venv - `python -m venv venv`
activate the venv - `source venv/bin/activate`
`pip install -r requirements.txt`
run app - `cd ..` && `uvicorn backend.main:app --reload`

## Docker
cd into the root directory (one level above the backend folder)
`docker build --platform linux/amd64 --no-cache -t kitchen-served-be -f backend/Dockerfile .` this passed the parent directory as the build context, which allows Docker to access files outside the backend folder
(build for local mac) `docker build -t kitchen-served-be -f backend/Dockerfile .` this passed the parent directory as the build context, which allows Docker to access files outside the backend folder
`docker run -p 8000:8000 kitchen-served-be`
test:
```
curl --location --request GET 'http://127.0.0.1:8000/recipes'
```

### Push image to ecr
Authenticate Docker to ECR registry:
`aws ecr --profile=qube get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Tag the Docker image:
`docker tag kitchen-served-be:latest 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`

Push to ECR:
`docker push 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`

### Run in ec2
SSH into the EC2 instance.
Install and start Docker (see TF-README.md for instructions. May not be needed if userscript is working).
Authenticate Docker to ECR (may need to install the AWS CLI on the EC2 instance if it's not already available):
`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Pull the image:
`sudo docker pull 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`

Run the image:
`sudo docker run --pull always -p 8000:8000 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`

Access the app on `44.203.43.176`. sample curl:
`curl --location --request GET 'http://44.203.43.176:8000/recipes'`
