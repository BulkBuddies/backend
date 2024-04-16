import {createUser, getAll} from '../models/userModel.js';

const createNewUser = async (req, res) =>{
    try {
        const user = req.body;
        await createUser(user)
        res.send("Usuario registrado con éxito");
    } catch (error) {
        next(error)
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await getAll();
        if (!users)
            return res.status(204).send({ "No users": users });
        return res.status(200).json(users);
    }
    catch (error) {
        next(error)
    }
};

export {createNewUser, getAllUser};