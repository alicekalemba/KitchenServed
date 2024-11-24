import os
import uuid
import logging
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from botocore.exceptions import ClientError
import boto3

logger = logging.getLogger(__name__)

s3_client = boto3.client('s3', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))
S3_BUCKET_NAME = "kitchen-served-images"


async def upload_image_to_s3(file: UploadFile, folder: str) -> str:
    """
    Upload an image to S3 and return the URL.

    :param file: UploadFile object
    :param folder: Folder path in S3 bucket where the file will be stored
    :return: URL of the uploaded image
    """
    try:
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"

        contents = await file.read()

        s3_client.put_object(
            Bucket=S3_BUCKET_NAME,
            Key=f"{folder}/{unique_filename}",
            Body=contents,
            ContentType=file.content_type
        )

        image_url = f"{folder}/{unique_filename}"
        return image_url

    except ClientError as e:
        logger.error(f"Error uploading to S3: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload image")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process image")

async def delete_image_from_s3(location: str):
    try:
        s3_client.delete_object(
            Bucket=S3_BUCKET_NAME,
            Key=location
        )
        logger.info(f"Deleted image from S3: {location}")
    except ClientError as e:
        logger.error(f"Error deleting from S3: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete image")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete image")
