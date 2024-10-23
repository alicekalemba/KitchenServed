# Nginx setup


## Hosting

### Install/start nginx on ec2:
`sudo yum update -y`
`sudo amazon-linux-extras install nginx1 -y`
`sudo systemctl start nginx`
`sudo systemctl enable nginx`
test: `http://<ec2-public-ip>` eg `http://100.25.82.37`


### Namecheap setup:
- Set up elastic ip for ec2 instance
- add A record for `@` to ec2 elastic ip
- add A record for `www` to ec2 elastic ip

### Configure Nginx:
- ssh into ec2 instance (check terraform readme)
- copy over config into ec2 (in the terraform dir): `scp -i kitchen-served-key.pem ../nginx/nginx.conf ec2-user@100.25.82.37:/home/ec2-user/nginx.conf` (or `sudo nano /etc/nginx/nginx.conf` in ec2)
- overwrite the default nginx config: (ssh first with `ssh -i kitchen-served-key.pem ec2-user@100.25.82.37`), `sudo mv /home/ec2-user/nginx.conf /etc/nginx/nginx.conf`
- Test and restart Nginx:
  `sudo nginx -t`
  `sudo systemctl restart nginx`


### Troubleshooting:
- nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- access logs: `sudo tail -f /var/log/nginx/access.log`

