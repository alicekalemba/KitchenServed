provider "aws" {
  region  = "us-east-1"
  profile = "power3"
}

# Create an S3 bucket for static website hosting.
resource "aws_s3_bucket" "website_bucket" {
  bucket = var.bucket_name

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "website_bucket" {
  bucket = aws_s3_bucket.website_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# # Set the bucket policy to make the content publicly readable.
resource "aws_s3_bucket_policy" "website_bucket_policy" {
  bucket = aws_s3_bucket.website_bucket.id
  
  # This dependency ensures the public access block is set before applying the policy
  depends_on = [aws_s3_bucket_public_access_block.website_bucket]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website_bucket.arn}/*"
      },
    ]
  })
}

# Upload the 'index.html' file to the S3 bucket.
resource "aws_s3_bucket_object" "index" {
  bucket = aws_s3_bucket.website_bucket.bucket
  key    = "index.html"
  source = "index.html"
  content_type = "text/html"
}

# Upload the 'styles.css' file to the S3 bucket.
resource "aws_s3_bucket_object" "styles" {
  bucket = aws_s3_bucket.website_bucket.bucket
  key    = "styles.css"
  source = "styles.css"
  content_type = "text/css"
}
