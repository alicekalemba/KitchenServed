#!/bin/bash
exec > /var/log/user-data.log 2>&1

# Update system and install Docker
yum update -y
yum install -y docker git
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Set up environment variables
# QUBE_IP=${qube_ip} - add below KITCHEN_SERVED_IP below
cat <<EOF > /opt/monitoring/.env
KITCHEN_SERVED_IP=${kitchen_served_ip}

GRAFANA_PASSWORD=${grafana_password}
EOF

# Set permissions
chown -R ec2-user:ec2-user /opt/monitoring
chmod 600 /opt/monitoring/.env

# Start monitoring stack
cd /opt/monitoring
docker-compose up -d

echo "Monitoring stack setup completed"
