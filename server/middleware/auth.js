import jwt from 'jsonwebtoken';

/* CHECK FOR TOKEN FROM HEADER AND IF THERE IS NO TOKEN THE RESPONSE IS DENIED */
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) {
      return res.status(403).send('Access Denied');
    }
    /* Get jwt secret to check */
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    /* Check given jwt secret vs the real one */
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
