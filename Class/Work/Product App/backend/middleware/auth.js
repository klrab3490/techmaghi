const jwt = require("jsonwebtoken");

/**
 * Middleware: Verify JWT and attach user info to req.user
 */
const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided. Please log in." });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET missing in environment variables.");
      return res.status(500).json({ error: "Server misconfiguration. Contact admin." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.id || decoded._id, // depending on your token payload
      role: decoded.role || "user",
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};

/**
 * Middleware: Restrict route access by role(s)
 * Example: router.post('/admin', auth, authorize('admin'), handler)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied. Insufficient permissions." });
    }

    next();
  };
};

/**
 * Helper Middleware: Allow if user owns the resource or is admin
 * Pass in the model to check (optional)
 */
const authorizeOwnerOrAdmin = (getOwnerId) => {
  return async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: "Authentication required." });
      }

      // If admin, skip ownership check
      if (user.role === "admin") {
        return next();
      }

      const ownerId = await getOwnerId(req);
      if (ownerId?.toString() !== user.id) {
        return res.status(403).json({ error: "You are not authorized to modify this resource." });
      }

      next();
    } catch (err) {
      return res.status(500).json({ error: "Authorization error: " + err.message });
    }
  };
};

module.exports = { auth, authorize, authorizeOwnerOrAdmin };
