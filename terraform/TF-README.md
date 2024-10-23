# Terraform setup

## AWS setup
aws configure --profile qube

## TF
`terraform init`
`terraform validate`
`terraform apply` (run this for updates the infra on the fly)

## How to run the BE app : known issues
- The ec2 instance is created but the docker image needs to be run manually once the ec2 instance is up, because the user-data script is still being debugged.
- Install and start docker on the ec2 with:
```
  sudo yum update -y
  sudo amazon-linux-extras install docker
  sudo systemctl start docker
  sudo systemctl enable docker
  sudo usermod -a -G docker ec2-user
```
### Run BE and FE apps in ec2
SSH into the EC2 instance.
Install and start Docker (see TF-README.md for instructions. May not be needed if userscript is working).
Authenticate Docker to ECR (may need to install the AWS CLI on the EC2 instance if it's not already available):
`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Run the images:
`docker run --pull always -d -p 8000:8000 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`
`docker run --pull always -d -p 3000:3000 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-fe-latest`

Access the BE-app on `100.25.82.37`. sample curl:
`curl --location --request GET 'http://100.25.82.37:8000/recipes'`
Access the FE-app on `100.25.82.37:3000`

### Troubleshooting EC2
Available disc space on ec2: `df -h`
clean up docker images: `docker system prune -a -f`