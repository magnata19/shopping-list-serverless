import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>{
    const method = event.httpMethod;
    const requestId = event.requestContext.requestId;
    const lambdaRequestId = context.awsRequestId;

    console.log(`API Gateway Request Id: ${requestId} - Lambda RequestId ${lambdaRequestId}`)

    if(event.resource === '/products') {
        if (method === 'GET') {

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "GET /products"
                })
            }
        } else if (method === 'POST') {
            
            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "POST /products"
                })
            }
        }
    } else if (event.resource === '/products/{id}') {
        const productId = event.pathParameters!.id!;
        if(method === 'GET') {

            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: `GET /products/${productId}`
                })
            }
        } else if (method === 'DELETE') {
            
            return {
                 statusCode: 204,
                body: JSON.stringify({
                    message: `DELETE /products/${productId}`
                })}
        } else if (method === 'PUT') {
            
           return { 
                statusCode: 200,
                body: JSON.stringify({
                    message: `PUT /products/${productId}`
                })}
        }
    }

    return {
        body: JSON.stringify("Deu ruim aq no productsFunction"),
        statusCode: 400,
        headers: {}
    }
}