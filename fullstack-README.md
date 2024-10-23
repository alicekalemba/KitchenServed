# Kitchen Served Full Stack


## Hosting

### Install/start nginx on ec2:
`sudo yum update -y`
`sudo amazon-linux-extras install nginx1 -y`
`sudo systemctl start nginx`
`sudo systemctl enable nginx`
test: `http://<ec2-public-ip>` eg `http://44.202.197.116`


### Namecheap setup:
- Set up elastic ip for ec2 instance
- add A record for `@` to ec2 elastic ip
- add A record for `www` to ec2 elastic ip

### Configure Nginx:
- sudo nano /etc/nginx/nginx.conf





