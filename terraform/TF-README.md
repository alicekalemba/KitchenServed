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
- To run the docker image, ssh into the instance via AWS console. Follow instructions in BE-Readme.md