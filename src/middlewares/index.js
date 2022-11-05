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

const validateTalk = (req, res, next) => {
    const { talk } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    const isDateValid = talk && dateRegex.test(talk.watchedAt);

    if (!talk) {
        return res.status(400).send({ message: 'O campo "talk" é obrigatório' });
    } if (!talk.watchedAt) {
        return res.status(400).send({ message: 'O campo "watchedAt" é obrigatório' });
    } if (!isDateValid) {
        return res.status(400)
            .send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    } 
    next();
};

const validateRate = (req, res, next) => {
    const { talk: { rate } } = req.body;

    if (rate == null) {
        return res.status(400).send({ message: 'O campo "rate" é obrigatório' });
    } if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
        return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

module.exports = {
    validateEmail,
    validatePassword,
    validateToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
};
