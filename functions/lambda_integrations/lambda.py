import json
def lambda_handler(event, context):
    """
    Función Lambda que devuelve 'Hola, Mundo!' como respuesta.
    """
    response = {
        'statusCode': 200,
        'body': 'Hola, Mundo!',
        'headers': {
            'Content-Type': 'application/json'
        }
    }
    return json.dumps(response)
