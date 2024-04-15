const validateParamUser = (req, res, next) => {
    const { first_name, last_name, email, username, password } = req.body;
    if (!first_name || !last_name || !email || !username ||!password) {
        return res.status(400).json({ error: "Debe llenar todos los campos" });
    }
    next();
}

export { validateParamUser };