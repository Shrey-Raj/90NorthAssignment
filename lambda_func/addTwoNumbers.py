import json

def lambda_handler(event, context):
    try:
        num1 = event.get('num1', 0)
        num2 = event.get('num2', 0)

        if not isinstance(num1, (int, float)) or not isinstance(num2, (int, float)):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Invalid input. Provide two numbers."})
            }

        result = num1 + num2

        return {
            "statusCode": 200,
            "body": json.dumps({"result": result})
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
