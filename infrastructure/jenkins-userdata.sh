#User data scripts are commands that AWS runs automatically when an EC2 instance first boots up.
#this userdata script sets up our Jenkins CI/CD server
#!/bin/bash
yum update -y

# Install Java 11 (required for Jenkins)
yum install -y java-11-amazon-corretto-headless

# Install Git
yum install -y git

# Install Docker
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -a -G docker ec2-user

# Install Jenkins
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
yum install -y jenkins

# Start Jenkins
systemctl start jenkins
systemctl enable jenkins

# Install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
yum install -y unzip
unzip awscliv2.zip
./aws/install

# Set up Jenkins initial admin password logging
echo "Jenkins initial admin password:" > /var/log/jenkins-setup.log
cat /var/lib/jenkins/secrets/initialAdminPassword >> /var/log/jenkins-setup.log

# Create a script to show the password easily
echo '#!/bin/bash' > /home/ec2-user/get-jenkins-password.sh
echo 'echo "Jenkins Admin Password:"' >> /home/ec2-user/get-jenkins-password.sh
echo 'sudo cat /var/lib/jenkins/secrets/initialAdminPassword' >> /home/ec2-user/get-jenkins-password.sh
chmod +x /home/ec2-user/get-jenkins-password.sh
chown ec2-user:ec2-user /home/ec2-user/get-jenkins-password.sh