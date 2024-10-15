# Output the name of the S3 bucket.
output "bucket_name" {
  description = "The name of the S3 bucket"
  value       = aws_s3_bucket.website_bucket.bucket
}

# Output the URL of the static website.
output "website_url" {
  description = "The URL of the static website"
  value       = aws_s3_bucket.website_bucket.website_endpoint
}
