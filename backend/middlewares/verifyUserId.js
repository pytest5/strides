const verifyUserId = (req, res, next) => {
  const { userId } = req.params;
  if (!userId)
    return res
      .status(400)
      .json({ error: "Unable to update user. Invalid userId." });
  next();
};

module.exports = verifyUserId;
