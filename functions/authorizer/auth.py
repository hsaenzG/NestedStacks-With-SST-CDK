def authorizer(event, context):  # pylint: disable=unused-argument
    """
        Handler to validate the session in keycloak using
        a class
    """
    print(event)
    arn = str(event['methodArn'])
    split_arn = arn.split("/")
    general_arn = split_arn[0]+"/"+split_arn[1]+"/*"
    policy = generate_allow_policy(general_arn, '')
    return policy


def generate_allow_policy(arn: str, user_id: str) -> dict:
    """
        Creates a policy to allow the access
    """
    allow_policy = {
        'principalId': 'user',
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [{
                'Action': 'execute-api:Invoke',
                'Effect': 'Allow',
                'Resource': arn
            }]
        },
        'context': {
            'keycloak_user_id': user_id
        }
    }
    print(allow_policy)
    return allow_policy
