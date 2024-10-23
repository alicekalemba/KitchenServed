terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.31.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "~> 2.0"
    }
  }

   backend "s3" {
      bucket         = "kitchen-served-terraform-state"
      key            = "terraform.tfstate"
      region         = "us-east-1"
      dynamodb_table = "kitchen-served-terraform-state-lock"
      encrypt        = true
   }
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}
