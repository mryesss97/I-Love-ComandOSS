import { Request, Response } from 'express';
import { verifySuiMessage } from '../utils/verify-sui';
import { prisma } from '../lib/prisma';
import { MESSAGE_SIGNING_KEY } from '../config/env';

export const verifyLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("**************************", req.body)
  const { signature, address } = req.body;

  try {
    const { isValid, userAddress: recoveredAddress } = await verifySuiMessage({
      message: MESSAGE_SIGNING_KEY,
      signature,
      address,
    });
    console.log('[verifyLogin] Result from verifySuiMessage:', {
      isValid,
      recoveredAddress,
    });

    if (!isValid || address.toLowerCase() !== recoveredAddress.toLowerCase()) {
      res
        .status(401)
        .json({ error: 'Invalid signature or mismatched address' });
      return;
    }

    const user = await prisma.user.upsert({
      where: { wallet: recoveredAddress },
      update: {},
      create: { wallet: recoveredAddress },
    });
    console.log('[verifyLogin] User:', user);

    res.json({ address: recoveredAddress, user });
  } catch (err) {
    console.error('[verifyLogin]', err);
    res.status(400).json({ error: 'Signature verification failed' });
  }
};
