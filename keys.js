// keys for firebase authentication and firestore database
// will prob make more sense to use a .env file but we need to modify webpack to get that to work.
export const serviceAccount = {
  type: 'service_account',
  project_id: 'popkwiz',
  private_key_id: '22fcd41c2a2cc7b867ed8feb0fd3dbdd62d4b036',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCh5HNXMZ0ARb5I\nIpqsBLpszLD88PAFPs81hGEI9CY/hdPwWc7aHLhg9r9nLFbYWcNvWj+q5/gZonj0\nrmO4SneeiJbB6CQdFDRD5CO47O4aJRTmQwQzEEjRv9HplOf5P6tgDYLWaZs6B9bo\nHBhRCAmLeH5xMp37ZwfM+FNrYOu0/1ehZxoMxcf3mDJqBhQ3Av1+I4yt6q9HO1K9\nHh7GZamk4RNAhLWbehB7jaaYwZd+sFh4UgLNPl7KvBh7xR7wMDpYJ4rvjbJZQ90o\nD21AJQJQc5jsa2OBwUGQRduKb5YwjExhL3BppM2/Ki6La7yEXpFLkKQ0hhO0lzsx\nnS9fUFYLAgMBAAECggEAL6CmgCnz7v8VrmIjz+SqNdT4Ysm9S0XBrxRtebVeRUTp\nZ6X8MXXOlpQxFjjYqdiqoulRnsWU23HNlOpzIuYhj+3OMGjLqxRlFe4Zxk9J8z4i\nimV/6EfrrG1643Wv00e0ctM2wT6bcLSauHl/e+NZ74K47DOAf9Q9WsNZw1blsT8P\nzjaNCzLK4aeaCJLNNDr8dNcsoNa+Vays98VM8Y42RlyS8uytfN6XYJhol7rI3Bfh\nUbmbbumXJKmf4hUq2kS7Ooy+LC9iv/cVGHi6GDF7r9Yx15ixtW/OGsxzaCTgGIf8\n7Oa06nCABn7cD2wwZGpEnXqkjU3fz+bXQxs3AYShkQKBgQDVRUyHmGaJFslKSSXw\ncKXMal+qOXqOlYFo0RddJ53PNjkD1iujp+CGc8V8otFFGpbwTvmaiUexXlQASk7j\nzL76Und1+ulFZy2asV0EyRGqNflMB72uwfxp8PT8wz/Is4YgvqYIKIfDJWLp4xIF\nAul8o+mS/cpEPV+DbYZxobN9GwKBgQDCU/JS9tBiLyWMMrx3Mq/0nqJwRfzgEqxG\nlLPIB1OyI+RX5D3pbXDyMqUg1//PHcpz0WG9SDgAt6/6quYQIFWUWE1EO1GKZcHu\nsAFy+bhY5wj1uLc42n1yniWP+VAT12CjbW5UcuLJP4MAFogmuYN1wf+rLqsebJ66\n/Iu3RXfJ0QKBgQDSrwDpOu6gIvh7AEQQgNfpVnRnDx05WgxbZaN1DTvihahRV/QI\nWkF90USY2aduYtQVVY9S0KcYWx0UpFPGym8njuwgityDCWiN1wUTQybGRUefik4i\nI9SdO8JpKOEL/f1Uv8H5cUCc0YQjlYQpmzTZQnvuD/UO8Ko4haw4+Qr9XQKBgFLQ\nZY+XoTyGbRDvOkPt9PBhfkYsfVScgJBfpLIU9UUQaKpQGVZWDnEYxihWBK0mO/XZ\ngDajBULBBRzlIcAzl2TtsJfoU5qQPPJUTXnLFBXG95mIC4UOD7H91XIixE6AVa2v\n3/nbL+ylxVUPRRyDqJNRhnxUGhaQIaD8KSqET0VRAoGABIoWWmlosfMHE2F6hn7x\ngJXuQT4s314KOpmxFgGEJU/II7+Ygvmqb683VtCpKvDZX/knBcNB7/InkLTWkrny\n9q8oV3hSiTRatSMzRD8sOZ4G/1tlHNMiMOGmTyX7/0Qe9b2bHznj9ad8C0eJorgA\nwQSztQiYd3fo17vf0EofFto=\n-----END PRIVATE KEY-----\n',
  client_email: 'popkwiz@appspot.gserviceaccount.com',
  client_id: '104687050956986174296',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/popkwiz%40appspot.gserviceaccount.com',
};

export const firebaseConfig = {
  apiKey: 'AIzaSyAX0ztYQLBWaTdqizTHDcm7u6uBY6ECAGM',
  authDomain: 'popkwiz.firebaseapp.com',
  projectId: 'popkwiz',
  databaseURL: 'https://popkwiz.firebaseio.com',
  storageBucket: 'popkwiz.appspot.com',
  messagingSenderId: '73392967405',
  appId: '1:73392967405:web:2772dfe8e9cfe40676c6e4',
  measurementId: 'G-DJPQDVGCWE',
};
