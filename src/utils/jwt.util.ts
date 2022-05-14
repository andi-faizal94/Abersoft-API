import jwt from 'jsonwebtoken';

// const secret = 'a@q5qCG+7jLeq^SU';

export const sign = (payload: any) =>
  jwt.sign(payload, 'secret', { expiresIn: 86400 });
export const verifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
