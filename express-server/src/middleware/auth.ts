import * as jose from 'jose';
import { type NextFunction, type Request, type Response } from 'express';

const JWKS = jose.createRemoteJWKSet(
  new URL(`${process.env.HANKO_API_URI}/.well-known/jwks.json`)
);

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  (async () => {
    try {
      let token: string | null = null;

      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        token = req.headers.authorization.split(' ')[1];
      } else if (req.cookies?.hanko) {
        token = req.cookies.hanko;
      }

      if (!token || token.length === 0) {
        return res.status(401).send('Unauthorized');
      }

      await jose.jwtVerify(token, JWKS);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).send('Authentication Token not valid');
    }
  })().catch((err) => {
    console.log('Error in checking authorization of request', err);
    res.status(500).send('Something went wrong with auth middleware');
  });
};
