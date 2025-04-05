import { SES } from '@aws-sdk/client-ses';

export const createSESClient = async() => {
    return new SES({
        region: process.env.AWS_BUCKET_REGION || 'us-east-1',
    });
}

