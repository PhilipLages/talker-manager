const validateEmail = (req, res, next) => {
    const { email } = req.body;
    const emailRegex = /^\S+@\S+\.\S+$/;

    const isEmailValid = emailRegex.test(email);
    
    if (!email) {
        return res.status(400).send({ message: 'O campo "email" é obrigatório' });
    } if (!isEmailValid) {
        return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
    } 
    next();
};

const validatePassword = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).send({ message: 'O campo "password" é obrigatório' });
    } if (password.length < 6) {
        return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    } 
    next();
};

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: 'Token não encontrado' });
    } if (token.length !== 16 || typeof token !== 'string') {
        return res.status(401).send({ message: 'Token inválido' });
    }
    next();
};

const validateName = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send({ message: 'O campo "name" é obrigatório' });
    } if (name.length < 3) {
        return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    } 
    next();
};

const validateAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
        return res.status(400).send({ message: 'O campo "age" é obrigatório' });
    } if (age < 18) {
        return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
    } 
    next();
};

module.exports = {
    validateEmail,
    validatePassword,
    validateToken,
    validateName,
    validateAge,
};