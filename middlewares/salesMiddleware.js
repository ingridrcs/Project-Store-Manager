const salesProductIdValidation = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};
const salesQuantityValidation = (req, res, next) => {
  const bodyVerify = req.body;
  const verifyQuantity = bodyVerify.some((sm) => sm.quantity);
  if (verifyQuantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (!verifyQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
module.exports = { salesProductIdValidation, salesQuantityValidation };