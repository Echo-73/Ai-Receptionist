// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   console.log("Received Authorization Header:", authHeader); // Debugging

//   if (!authHeader) {
//     return res.status(401).json({ error: "Access denied. No token provided." });
//   }

//   const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
//   if (!token) {
//     return res.status(401).json({ error: "Invalid token format. Please log in again." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decoded); // Debugging token data
//     req.user = decoded; // Attach user data
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token. Please log in again." });
//   }
// };

// module.exports = authMiddleware;
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.userId };  // Ensure user ID is attached
    console.log("Decoded Token:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;