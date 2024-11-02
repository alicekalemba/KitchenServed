# Monitoring setup

Stack: Prometheus, Grafana

## Manual setup in ec2
Manual steps to test user_data script (these steps will be replicated in the user_data script)

### Update and install Docker
ssh: `ssh -i kitchen-served-key.pem ec2-user@44.222.68.23`
sudo yum update -y
sudo yum install -y docker git
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

### Log out and log back in for docker group to take effect
exit

### ssh back in, install Docker Compose

sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

### Create directories and copy configs
sudo mkdir -p /opt/monitoring/{prometheus,grafana}
- Change ownership of the entire /opt/monitoring directory to ec2-user
sudo chown -R ec2-user:ec2-user /opt/monitoring

- Set appropriate permissions
sudo chmod -R 755 /opt/monitoring

from local:
scp -i kitchen-served-key.pem -r monitoring/docker/* ec2-user@44.222.68.23:/opt/monitoring/

### Test docker-compose setup
cd /opt/monitoring
docker-compose up -d
docker-compose logs
docker system prune -a -f (to clean up)

### Access Grafana
http://44.222.68.23:3000
pwd: admin, pwd: empty
- Reset admin password if needed
docker exec -it monitoring-grafana-1 grafana-cli admin reset-admin-password 123456


### Access Prometheus
http://44.222.68.23:9090