# Define a variable for the S3 bucket name.
variable "bucket_name" {
  description = "The name of the S3 bucket"
  type        = string
  default     = "kitchen-served-bucket"
}
