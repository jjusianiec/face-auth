const s3 = require('s3');

const client = s3.createClient({
  s3Options: {
    region: 'eu-west-1',
  },
});

client.uploadDir({
  localDir: 'public',
  s3Params: {
    Bucket: 'face-auth-frontend',
    ACL: 'public-read',
  },
});
