import { verifyPersonalMessageSignature } from '@mysten/sui/verify';

export const verifySuiMessage = async ({
  message,
  signature,
  address,
}: {
  message: string;
  signature: string;
  address: string;
}) => {
  try {
  console.log("**************************")

    const messageEncoded = new TextEncoder().encode(message);
    const publicKey = await verifyPersonalMessageSignature(
      messageEncoded,
      signature
    );

    const addressDecode = publicKey.toSuiAddress();
    const isValid = isSameAddress(addressDecode, address);
    console.log('isValid signature', { addressDecode, isValid });
    return { isValid, userAddress: addressDecode };
  } catch (err) {
    console.log("err failed to verify signature", err);
    return { isValid: false, userAddress: '' };
  }
};

export const isSameAddress = (a?: string, b?: string) => {
  if (!a || !b) return false;
  return a.toLowerCase() === b.toLowerCase();
};
