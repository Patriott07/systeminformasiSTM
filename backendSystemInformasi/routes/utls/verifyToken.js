import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.token; // token dari headers
  
  // console.log({token})
  if (!token) return res.json(401, {error : 'UnAuthorized'})

  jwt.verify(token, "systeminformasiwwwSystemSekolahSmkn1ccirebonn2345t", (err, user) => {
    // if (err) return next(errorHandler(403, 'Forbidden'));
    if (err) {
      console.log({err, token});
      return;
    }
    
    req.user = user._doc;
    next();
  });
};
