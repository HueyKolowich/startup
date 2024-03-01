import json
import os
import sys

import boto3
import botocore

module_path = ".."
sys.path.append(os.path.abspath(module_path))
from utils import bedrock


# ---- ⚠️ Un-comment and edit the below lines as needed for your AWS setup ⚠️ ----

os.environ["AWS_DEFAULT_REGION"] = "us-east-1"  # E.g. "us-east-1"
os.environ["AWS_PROFILE"] = "image-generation"
# os.environ["BEDROCK_ASSUME_ROLE"] = "<YOUR_ROLE_ARN>"  # E.g. "arn:aws:..."


boto3_bedrock = bedrock.get_bedrock_client(
    assumed_role=os.environ.get("BEDROCK_ASSUME_ROLE", None),
    region=os.environ.get("AWS_DEFAULT_REGION", None)
)

####

prompt = "a beautiful lake surrounded by trees with a mountain range at the distance"
negative_prompts = "poorly rendered, poor background details, poorly drawn mountains, disfigured mountain features"

# Create payload
body = json.dumps(
    {
        "taskType": "TEXT_IMAGE",
        "textToImageParams": {
            "text": prompt,                    # Required
            "negativeText": negative_prompts   # Optional
        },
        "imageGenerationConfig": {
            "numberOfImages": 1,   # Range: 1 to 5 
            "quality": "standard",  # Options: standard or premium
            "height": 512,        # Supported height list in the docs 
            "width": 512,         # Supported width list in the docs
            "cfgScale": 7.5       # Range: 1.0 (exclusive) to 10.0
            # "seed": 42             # Range: 0 to 214783647
        }
    }
)

# Make model request
response = boto3_bedrock.invoke_model(
    body=body,
    modelId="amazon.titan-image-generator-v1",
    accept="application/json", 
    contentType="application/json"
)

# Process the image
response_body = json.loads(response.get("body").read())
img1_b64 = response_body["images"][0]

import base64
import io
from PIL import Image

image = Image.open(io.BytesIO(base64.decodebytes(bytes(img1_b64, "utf-8"))))
image.show()
image.save("test.png")
