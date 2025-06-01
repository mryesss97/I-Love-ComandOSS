import { Request, Response, NextFunction } from 'express';
import { verifySuiMessage } from '../utils/verify-sui';
import { isSameAddress } from '../utils/address';

export const verifySignatureMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = req.headers['x-signature'] as string;
  const { address } = req.body;
  console.log("signature and address", { signature, address });

  verifySuiMessage({ signature, address })
    .then(({ isValid, userAddress }) => {
      if (!isValid || !isSameAddress(address, userAddress)) {
        return res
          .status(401)
          .json({ error: 'Invalid signature or mismatched address' });
      }

      req.user = { address: userAddress };
      next();
    })
    .catch((err) => {
      console.error('[verifySignatureMiddleware]', err);
      return res.status(400).json({ error: 'Failed to verify signature' });
    });
};
