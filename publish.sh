#!/bin/sh

cd lambda
zip lambda-upload.zip index.js response.js
aws lambda update-function-code --function-name greeting --zip-file fileb://lambda-upload.zip
