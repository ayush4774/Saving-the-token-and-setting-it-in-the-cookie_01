const crypto = require('crypto');

// Use 256-bit key for AES-256
const secretKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // Initialization Vector

const algorithm = 'aes-256-cbc';

const encrypt = (payload) => {
  const jsonData = JSON.stringify(payload);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(jsonData, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedData = {
    iv: iv.toString('hex'),
    content: encrypted
  };

  return JSON.stringify(encryptedData);
};

const decrypt = (token) => {
  const encryptedData = JSON.parse(token);
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(encryptedData.iv, 'hex')
  );

  let decrypted = decipher.update(encryptedData.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return JSON.parse(decrypted);
};

module.exports = {
  encrypt,
  decrypt
};