import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack || err.message);
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
};

export default errorHandler;
