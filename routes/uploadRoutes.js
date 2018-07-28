const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

// presigned URL
const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    // generates uuid key for bucket
    const key = `${req.user.id}/${uuid()}.jpeg`;

    s3.getSignedUrl(
      'putObject', {
        Bucket: 'dingo-fetch-blog-bucket-1',
        ContentType: 'image/jpeg',
        Key: key
      },
      (err, url) => res.send({
        key,
        url
      })
    );
  });
};
