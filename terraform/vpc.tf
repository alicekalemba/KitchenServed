# Fetch available availability zones for better distribution of resources
data "aws_availability_zones" "available" {}

# VPC module: Creates a VPC, public and private subnets, and other necessary networking resources
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "qube-vpc"
  cidr = var.vpc_cidr

  azs             = [data.aws_availability_zones.available.names[0], data.aws_availability_zones.available.names[1]]
  public_subnets  = [cidrsubnet(var.vpc_cidr, 8, 0), cidrsubnet(var.vpc_cidr, 8, 1)]
  private_subnets = [cidrsubnet(var.vpc_cidr, 8, 2), cidrsubnet(var.vpc_cidr, 8, 3)]

  enable_nat_gateway   = false #todo may need to enable this for docker image updates?
  enable_dns_support   = true
  enable_dns_hostnames = true

  map_public_ip_on_launch = true  # Ensure instances in public subnets get public IPs

  tags = {
    Name = "kitchen-served-vpc"
  }
}