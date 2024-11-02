# Security group for monitoring instance
resource "aws_security_group" "monitoring_sg" {
  vpc_id = module.vpc.vpc_id
  name   = "monitoring-security-group"

  # Prometheus
  ingress {
    from_port = 9090
    to_port   = 9090
    protocol  = "tcp"
    security_groups = [
      aws_security_group.ec2_sg.id  # KitchenServed EC2
#       aws_security_group.qube_ec2_sg.id   # Qube EC2
    ]
  }

    ingress {
      from_port   = 9090
      to_port     = 9090
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
#       cidr_blocks = [var.admin_ip_cidr]
    }

  # Grafana
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from any IP
#     cidr_blocks = [var.admin_ip_cidr]  # Restrict to admin IP
  }

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Allow SSH from any IP
#     cidr_blocks = [var.admin_ip_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "MonitoringSecurityGroup"
    Project = "KitchenServed"
    DoNotStop = "true"
  }
}

# EC2 instance for monitoring
resource "aws_instance" "monitoring" {
  ami           = "ami-0f9fc25dd2506cf6d"  # Amazon Linux 2
  instance_type = "t3.small"
  subnet_id     = module.vpc.public_subnets[0]

  vpc_security_group_ids = [aws_security_group.monitoring_sg.id]
  key_name              = aws_key_pair.kitchen_served_key.key_name

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = "Qube_KS_Monitoring"
    Project = "KitchenServed"
  }

#   # Copy monitoring configuration files
#   provisioner "file" {
#     source      = "${path.module}/docker"
#     destination = "/opt/monitoring"
#
#     connection {
#       type        = "ssh"
#       user        = "ec2-user"
#       private_key = file("kitchen-served-key.pem")
#       host        = self.public_ip
#     }
#   }
#
#   user_data = templatefile("${path.module}/monitoring/user_data.sh", {
#     kitchen_served_ip = aws_instance.ec2.private_ip
# #     qube_ip          = aws_instance.qube.private_ip
#     grafana_password = var.grafana_password
#   })
#
#   depends_on = [
#     aws_instance.ec2  # KitchenServed instance
# #     aws_instance.qube  # Qube instance
#   ]
}

# Allow Prometheus scraping from monitoring instance
resource "aws_security_group_rule" "allow_prometheus_kitchen_served" {
  type                     = "ingress"
  from_port               = 8000
  to_port                 = 8000
  protocol                = "tcp"
  source_security_group_id = aws_security_group.monitoring_sg.id
  security_group_id       = aws_security_group.ec2_sg.id
}

# resource "aws_security_group_rule" "allow_prometheus_qube" {
#   type                     = "ingress"
#   from_port               = 8080
#   to_port                 = 8080
#   protocol                = "tcp"
#   source_security_group_id = aws_security_group.monitoring_sg.id
#   security_group_id       = aws_security_group.qube_ec2_sg.id
# }
