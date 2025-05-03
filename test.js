const { encrypt, decrypt } = require('./script');

const originalPayload = {
  userId: 101,
  username: 'john_doe',
  role: 'admin'
};

// Step 1: Encrypt the payload
const token = encrypt(originalPayload);
console.log('🔒 Encrypted token:', token);

// Step 2: Decrypt the token
const decryptedPayload = decrypt(token);
console.log('🔓 Decrypted payload:', decryptedPayload);

// Step 3: Compare original and decrypted data
if (JSON.stringify(originalPayload) === JSON.stringify(decryptedPayload)) {
  console.log('✅ Success: The decrypted data matches the original!');
} else {
  console.log('❌ Failed: The decrypted data does not match.');
}