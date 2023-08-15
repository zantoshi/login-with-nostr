import * as crypto from 'crypto';

const generateRandomNumber = (min: number, max: number): number => {
  const randomBytes = crypto.randomBytes(8); // 8 bytes = 64 bits
  const randomNumber = parseInt(randomBytes.toString('hex'), 16);
  return min + (randomNumber % (max - min));
};

export default generateRandomNumber;