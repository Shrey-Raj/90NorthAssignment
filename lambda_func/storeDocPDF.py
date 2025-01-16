import boto3
import base64
import json

s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        bucket_name = event.get('bucket_name')
        file_name = event.get('file_name')
        file_content = event.get('file_content')

        if not bucket_name or not file_name or not file_content:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "bucket_name, file_name, and file_content are required."})
            }

        decoded_content = base64.b64decode(file_content)

        s3.put_object(Bucket=bucket_name, Key=file_name, Body=decoded_content)

        return {
            "statusCode": 200,
            "body": json.dumps({"message": "File uploaded successfully.", "file_name": file_name})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
