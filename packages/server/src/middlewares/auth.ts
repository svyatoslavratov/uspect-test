import passport from "passport";
import { Request, Response, NextFunction } from "express";

import { UserRoles } from "models/user";
import { IError } from "interfaces/IError";

export const withAuth = ({
  roles,
  unconfirmedEmail
}: {
  roles?: UserRoles[];
  unconfirmedEmail?: boolean;
}) => (req: Request, res: Response, next: NextFunction): Promise<void> =>
  passport.authenticate("jwt", async (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const err: IError = new Error("unauthorised");
      err.status = 401;
      return next(err);
    }

    if (!unconfirmedEmail && !user.emailVerified) {
      const err: IError = new Error("Email not verified");
      err.status = 403;
      return next(err);
    }

    if (roles && !roles.includes(user.role)) {
      const err: IError = new Error("Access denied");
      err.status = 403;
      return next(err);
    }

    req.user = user;
    next();
  })(req, res, next);
