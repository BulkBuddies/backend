const checkIdMatchHandler = (req, res, next) => {
  try {
    const { id } = req.params;
    const tokenData = req.token;
    const userIdFromParams = id;
    const userIdFromToken = tokenData.id;

    if (!userIdFromParams) return next();

    if (userIdFromParams !== userIdFromToken) {
      return res.status(403).json({
        messsage: " No estás autorizado para acceder a este recurso.",
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { checkIdMatchHandler };
