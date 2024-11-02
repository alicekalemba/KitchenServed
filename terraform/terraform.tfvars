aws_profile = "qube"
aws_region = "us-east-1"

# EC2 instance type
instance_type = "t3.micro"

# RDS database configuration
rds_db_name    = "qube"
rds_username   = "qube"
rds_password   = "qube0123456789!"

# VPC configuration
vpc_cidr           = "10.0.0.0/16"
public_subnet_cidr = "10.0.1.0/24"
private_subnet_cidr = "10.0.2.0/24"

# Admin access
admin_ip_cidr = "192.168.1.241/32"

# Grafana configuration
grafana_password = "qube_ks_grafana1@"
