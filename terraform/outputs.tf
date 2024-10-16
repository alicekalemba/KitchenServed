# Output the VPC ID for easy access
output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

# Output the public subnet IDs
output "public_subnet_ids" {
  description = "The IDs of the public subnets"
  value       = module.vpc.public_subnets
}

# Output the private subnet IDs
output "private_subnet_ids" {
  description = "The IDs of the private subnets"
  value       = module.vpc.private_subnets
}

# Output the security group ID of the EC2 instance
output "ec2_security_group_id" {
  description = "The security group ID of the EC2 instance"
  value       = aws_security_group.ec2_sg.id
}

# Output the public IP of the EC2 instance
output "ec2_public_ip" {
  description = "The public IP of the EC2 instance"
  value       = aws_instance.ec2.public_ip
}

# Output the EC2 instance ID
output "ec2_instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.ec2.id
}

# Output the RDS instance endpoint for connecting the app to the database
# output "rds_endpoint" {
#   description = "The endpoint for the RDS PostgreSQL instance"
#   value       = aws_db_instance.postgres.endpoint
# }
#
# # Output the RDS instance ID
# output "rds_instance_id" {
#   description = "The ID of the RDS instance"
#   value       = aws_db_instance.postgres.id
# }
#
# # Output the RDS database name
# output "rds_db_name" {
#   description = "The name of the RDS database"
#   value       = aws_db_instance.postgres.db_name
# }
