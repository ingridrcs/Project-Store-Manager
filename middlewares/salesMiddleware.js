const salesProductIdValidation = (req, res, next) => {
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};
const salesQuantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
module.exports = { salesProductIdValidation, salesQuantityValidation };
// Não estão funcionando