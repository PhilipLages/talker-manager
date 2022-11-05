const { readFile, writeFile } = require('fs/promises');
const path = require('path');
const token = require('@supercharge/strings');

const pathName = '../talker.json';
const talkersPath = path.resolve(__dirname, pathName);
const getRandomToken = () => token.random(16); 

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

const createNewTalker = async (name, age, rate, watchedAt) => {
    const talkers = await getTalkers();

    const id = talkers[talkers.length - 1].id + 1;

    const newTalker = {
        name,
        age,
        id,
        talk: {
            watchedAt,
            rate,
        },            
    };

    talkers.push(newTalker);
    await writeFile(talkersPath, JSON.stringify(talkers, null, 2));

    return newTalker;
};

const updateTalker = async (id, ...rest) => {
    const talkers = await getTalkers();
    const updatedTalkers = talkers.map((talker) => {
        if (talker.id === id) {
            return {
                ...talker,
                name: rest[0],
                age: rest[1],
                talk: {
                    watchedAt: rest[2],
                    rate: rest[3],
                },
            };
        }
        return talker;
    });
    await writeFile(talkersPath, JSON.stringify(updatedTalkers, null, 2));
    
    return updatedTalkers.find((talker) => talker.id === id);
};

const deleteTalker = async (id) => {
    const talkers = await getTalkers();

    const indexToDelete = talkers.findIndex((team) => team.id === Number(id));
    talkers.splice(indexToDelete, 1);
  
    await writeFile(talkersPath, JSON.stringify(talkers, null, 2));
};

module.exports = {
    getTalkers,
    getTalkerById,
    getRandomToken,
    createNewTalker,
    updateTalker,
    deleteTalker,
};
