const validateParamUser = (req, res, next) => {
    const { email, name, last_name, phone, name_user, password, password_repeat } = req.body;
    if (!email || !name || !last_name || !phone ||!name_user ||!password ||!password_repeat) {
        return res.status(400).json({ error: "Debe llenar todos los campos" });
    }
    if(password !== password_repeat){
        return res.status(400).json({ error: "claves deben ser iguales" });
    }
    next();
}

export { validateParamUser };