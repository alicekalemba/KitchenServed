# Terraform setup

## AWS setup
`aws configure --profile qube`
`export AWS_PROFILE=qube`
`aws sts get-caller-identity`
## TF

### Set up backend state storage
- First, create the S3 bucket and DynamoDB table
`terraform init`
`terraform apply` (only run the state-storage.tf)
- make sure resources are created, such as the dynamo db: `aws dynamodb list-tables --profile qube`
- in case of error, remove state manually: `rm -rf .terraform terraform.tfstate*` and then 
apply the resource individually: `terraform apply -target=aws_dynamodb_table.terraform_state_lock`


- Once this is done, do not run the `state-storage.tf` commands again. Comment out the code in that file.

- Reinitialize with the new backend (make sure the main app's resources are commented in)
`terraform init -upgrade -migrate-state`
- Finally, create the app's resources
`terraform apply`

Other handy commands:
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
### ssh into ec2
- ensure pem file has correct permissions: `chmod 400 kitchen-served-key.pem`
- Remove the old key from known_hosts file if it exists: `ssh-keygen -R 100.25.82.37`
- ssh: `ssh -i kitchen-served-key.pem ec2-user@100.25.82.37`

### Run BE and FE apps in ec2
#### FE
(make sure destination folder exists: ssh and then `mkdir -p /home/ec2-user/frontend/kitchen-served-fe-app`)
update  permissions to allow copying: `sudo chmod -R u+w /home/ec2-user/frontend/kitchen-served-fe-app/build/ && sudo chown -R ec2-user:ec2-user /home/ec2-user/frontend/kitchen-served-fe-app/build/`
copy FE build over to ec2: `scp -i kitchen-served-key.pem -r ../frontend/kitchen-served-fe-app/build ec2-user@100.25.82.37:/home/ec2-user/frontend/kitchen-served-fe-app/`

SSH into the EC2 and Update permissions to allow nginx to serve the files:
sudo chmod -R 755 /home/ec2-user/frontend/kitchen-served-fe-app/build && sudo chown -R ec2-user:nginx /home/ec2-user/frontend/kitchen-served-fe-app/build && sudo chmod 755 /home && sudo chmod 755 /home/ec2-user && sudo chmod -R 755 /home/ec2-user/frontend/kitchen-served-fe-app && sudo chown -R nginx:nginx /home/ec2-user/frontend/kitchen-served-fe-app/build/ && sudo chmod -R 755 /home/ec2-user/frontend/kitchen-served-fe-app/build/

#### BE
Install and start Docker (see TF-README.md for instructions. May not be needed if userscript is working).
Authenticate Docker to ECR (may need to install the AWS CLI on the EC2 instance if it's not already available):
`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com`

Run the images:
`docker run --restart always --pull always -d -p 8000:8000 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest`

Access the BE-app on `100.25.82.37` (Static Elastic IP). sample curl:
`curl --location --request GET 'http://100.25.82.37:8000/recipes'`
Access the FE-app on `100.25.82.37:3000`

##### Nginx
restart nginx: `sudo systemctl restart nginx`

### Troubleshooting EC2
Available disc space on ec2: `df -h`
clean up docker images: `docker system prune -a -f`

### Handy commands
delete `aws iam delete-instance-profile --instance-profile-name instance-profile-name`