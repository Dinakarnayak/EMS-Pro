// Script for hashing passwords
import { hashPassword } from './utils/hash.util';

const runHashing = async () => {
  const hashed = await hashPassword('examplePassword');
  console.log('Hashed Password:', hashed);
};

runHashing();
