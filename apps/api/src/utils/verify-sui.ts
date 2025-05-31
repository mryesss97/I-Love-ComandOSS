import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import { MESSAGE_SIGNING_KEY } from '../config/env';

export const verifySuiMessage = async ({
  signature,
  address,
}: {
  signature: string;
  address: string;
}) => {
  try {

    const messageEncoded = new TextEncoder().encode(MESSAGE_SIGNING_KEY);
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
