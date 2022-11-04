const { readFile } = require('fs/promises');
const path = require('path');
// const token = require('@supercharge/strings');

const pathName = '../talker.json';
const talkersPath = path.resolve(__dirname, pathName);
// const randomToken = token.random(16); 

const getTalkers = async () => {
    const response = await readFile(talkersPath, 'utf8');

    const talkers = JSON.parse(response);

    return talkers;
};

const getTalkerById = async (id) => {
    const talkers = await getTalkers();

    const foundTalker = talkers.find((talker) => talker.id === id);

    return foundTalker;
};

module.exports = {
    getTalkers,
    getTalkerById,
};
