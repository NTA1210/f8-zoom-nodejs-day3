const createRateLimiter = ({
  windowMs = 60000,
  maxRequests = 100,
  message = "Too many requests",
}) => {
  const requestStore = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const timestamp = Date.now();

    if (!requestStore.has(ip)) {
      requestStore.set(ip, {
        timestamp,
        count: 1,
      });
      return next();
    }

    const ipData = requestStore.get(ip);

    const elapsedTime = timestamp - ipData.startTime;

    if (elapsedTime > windowMs) {
      requestStore.set(ip, {
        timestamp,
        count: 1,
      });
      return next();
    }

    ipData.count += 1;

    if (ipData.count > maxRequests) {
      return res.error(
        {
          message,
        },
        429
      );
    }

    next();
  };
};

module.exports = createRateLimiter;
