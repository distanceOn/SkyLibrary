const logOriginalUrl = (req, res, next) => {
  console.log(`Request URL: ${req.originalUrl}`);
  next();
};

export default logOriginalUrl;
