# Generate private key
resource "tls_private_key" "kitchen_served_private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Create AWS key pair using the generated public key
resource "aws_key_pair" "kitchen_served_key" {
  key_name   = "kitchen-served-key"
  public_key = tls_private_key.kitchen_served_private_key.public_key_openssh
}

# Save private key to file
resource "local_file" "private_key" {
  content         = tls_private_key.kitchen_served_private_key.private_key_pem
  filename        = "kitchen-served-key.pem"
  file_permission = "0400"
}

# Define the EC2 security group
resource "aws_security_group" "ec2_sg" { # this is the ks ec2 security group. failed to rename it to ks_ec2_sg
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from any IP
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow HTTP traffic on port 80
  }

  ingress {
     from_port   = 443
     to_port     = 443
     protocol    = "tcp"
     cidr_blocks = ["0.0.0.0/0"] # Allow HTTPS traffic on port 443
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic for BE app on port 8000
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow traffic on port 3000
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Allow all outbound traffic
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "KitchenServedEC2SecurityGroup"
    Project = "KitchenServed"
    DoNotStop = "true"
  }
}

# Define IAM Role for EC2 to access ECR
resource "aws_iam_role" "ec2_ecr_role" {
  name = "KitchenServedEC2ECRAccessRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "KitchenServedEC2ECRRole"
    Project = "KitchenServed"
  }
}

# Attach ECR access policy to the IAM Role
resource "aws_iam_policy" "ecr_policy" {
  name = "KitchenServedECRFullAccessPolicy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetAuthorizationToken"
        ],
        Effect   = "Allow",
        Resource = "*"
      }
    ]
  })

  tags = {
    Name = "KitchenServedECRPolicy"
    Project = "KitchenServed"
  }
}

# Attach policy to IAM Role
resource "aws_iam_role_policy_attachment" "ecr_role_policy_attachment" {
  role       = aws_iam_role.ec2_ecr_role.name
  policy_arn = aws_iam_policy.ecr_policy.arn
}

# Attach the IAM Role to the EC2 instance
resource "aws_iam_instance_profile" "ec2_instance_profile" {
  name = "KitchenServedEC2InstanceProfile"
  role = aws_iam_role.ec2_ecr_role.name

  tags = {
    Name = "KitchenServedInstanceProfile"
    Project = "KitchenServed"
  }
}

# Define the EC2 instance
resource "aws_instance" "ec2" {
  ami                    = "ami-0f9fc25dd2506cf6d" # Amazon Linux 2 AMI (HVM) - Kernel 5.10
  instance_type          = var.instance_type
  subnet_id              = module.vpc.public_subnets[0]
  vpc_security_group_ids = [aws_security_group.ec2_sg.id]
  associate_public_ip_address = true
  iam_instance_profile   = aws_iam_instance_profile.ec2_instance_profile.name
  key_name               = aws_key_pair.kitchen_served_key.key_name

  tags = {
    Name = "KitchenServedEC2Instance"
    Project = "KitchenServed"
  }

  user_data = <<-EOF
  #!/bin/bash
  exec > /var/log/user-data.log 2>&1

  echo "Starting user data script"

  yum update -y
  amazon-linux-extras install docker -y
  systemctl start docker
  systemctl enable docker
  usermod -a -G docker ec2-user

  echo "Waiting for Docker to be ready"
  timeout 30 sh -c 'until docker info; do sleep 1; done'

  aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 975050311957.dkr.ecr.us-east-1.amazonaws.com

  docker pull 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest

  docker run -d -p 8000:8000 975050311957.dkr.ecr.us-east-1.amazonaws.com/kitchen-served-repo:kitchen-served-be-latest

  echo "User data script completed"
  EOF
}