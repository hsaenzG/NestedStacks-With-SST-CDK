import json

def handler(event, context):
    headers = (
        {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, PUT, POST, DELETE, PATCH, HEAD',
        }
    )
    data = None
    body = {'status': 200, 'message': 'Done', 'data': data}
    return {'headers': headers, 'statusCode': 200, 'body': json.dumps(body)}