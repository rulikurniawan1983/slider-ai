import { encrypt, decrypt } from "@/lib/utils/encryption";

describe("Encryption", () => {
  it("should encrypt and decrypt text correctly", () => {
    const original = "secret message";
    const encrypted = encrypt(original);
    const decrypted = decrypt(encrypted);
    expect(decrypted).toBe(original);
    expect(encrypted).not.toBe(original);
  });

  it("should produce different ciphertext for same plaintext", () => {
    const original = "same text";
    const enc1 = encrypt(original);
    const enc2 = encrypt(original);
    expect(enc1).not.toBe(enc2);
  });
});
