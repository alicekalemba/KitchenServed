# AWS profile
variable "aws_profile" {
  description = "The AWS profile to use for authentication"
  type        = string
  default     = "qube"
}

# AWS region
variable "aws_region" {
  description = "The AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

# EC2 instance type
variable "instance_type" {
  description = "The type of EC2 instance to be created"
  type        = string
  default     = "t3.micro"
}

# rds already exists. ignoring
# # RDS database name
# variable "rds_db_name" {
#   description = "The name of the RDS PostgreSQL database"
#   type        = string
# }
#
# # RDS master username
# variable "rds_username" {
#   description = "The master username for the RDS PostgreSQL instance"
#   type        = string
# }
#
# # RDS master password
# variable "rds_password" {
#   description = "The master password for the RDS PostgreSQL instance"
#   type        = string
#   sensitive   = true
# }

# VPC CIDR block
variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

# Public subnet CIDR block
variable "public_subnet_cidr" {
  description = "The CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

# Private subnet CIDR block
variable "private_subnet_cidr" {
  description = "The CIDR block for the private subnet"
  type        = string
  default     = "10.0.2.0/24"
}
