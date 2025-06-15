output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "jenkins_instance_id" {
  description = "ID of the Jenkins EC2 instance"
  value       = aws_instance.jenkins.id
}

output "jenkins_public_ip" {
  description = "Public IP address of Jenkins server"
  value       = aws_instance.jenkins.public_ip
}

output "jenkins_public_dns" {
  description = "Public DNS name of Jenkins server"
  value       = aws_instance.jenkins.public_dns
}

output "jenkins_url" {
  description = "URL to access Jenkins"
  value       = "http://${aws_instance.jenkins.public_ip}:8080"
}

output "app_instance_id" {
  description = "ID of the Application EC2 instance"
  value       = aws_instance.app.id
}

output "app_public_ip" {
  description = "Public IP address of Application server"
  value       = aws_instance.app.public_ip
}

output "app_public_dns" {
  description = "Public DNS name of Application server"
  value       = aws_instance.app.public_dns
}

output "load_balancer_dns" {
  description = "DNS name of the Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "app_url" {
  description = "URL to access the application via Load Balancer"
  value       = "http://${aws_lb.main.dns_name}"
}

output "app_health_check_url" {
  description = "Health check URL via Load Balancer"
  value       = "http://${aws_lb.main.dns_name}/health"
}

output "security_group_jenkins_id" {
  description = "ID of the Jenkins security group"
  value       = aws_security_group.jenkins.id
}

output "security_group_app_id" {
  description = "ID of the Application security group"
  value       = aws_security_group.app.id
}

output "iam_role_arn" {
  description = "ARN of the EC2 IAM role"
  value       = aws_iam_role.ec2_role.arn
}

output "key_pair_name" {
  description = "Name of the SSH key pair"
  value       = aws_key_pair.main.key_name
}