const { readFile } = require('fs/promises');
const path = require('path');
// const token = require('@supercharge/strings');

const pathName = '../talker.json';
const talkersPath = path.resolve(__dirname, pathName);

// const randomToken = token.random(16); 

const getAllTalkers = async () => {
    const response = await readFile(talkersPath, 'utf8');
    const talkers = JSON.parse(response);
    return talkers;
};

getAllTalkers();

module.exports = {
    getAllTalkers,
};
