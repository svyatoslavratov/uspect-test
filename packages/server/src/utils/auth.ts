import crypto from "crypto";

const KEY_LEN = 64;

export const hashPassword = async (
  password: string,
  salt: string
): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LEN, (err, derivedKey) => {
      if (err) {
        reject(err);
      }

      resolve(derivedKey.toString("hex"));
    });
  });
};

export const verifyPassword = async (
  password: string,
  hash: string,
  salt: string
): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    crypto.scrypt(password, salt, KEY_LEN, (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(hash === derivedKey.toString("hex"));
    });
  });
};
