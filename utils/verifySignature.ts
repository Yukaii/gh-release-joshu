import * as crypto from "crypto";

export const verifySignature = (
  secret: string,
  body: string,
  signatureFromHeader: string,
): boolean => {
  const signature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");
  const trusted = Buffer.from(`sha256=${signature}`, "ascii");
  const untrusted = Buffer.from(signatureFromHeader, "ascii");

  try {
    return crypto.timingSafeEqual(trusted, untrusted);
  } catch {
    return false;
  }
};

export default verifySignature;
