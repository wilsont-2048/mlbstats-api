const superagent = require('superagent');

const config = require('./config.json')

const doPlayerSearch = async (name) => {
    try {
        const searchURL = `${config.url}/named.search_player_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&name_part=%27${name}%25%27`;
        const response = await superagent.get(searchURL);
    
        return response.body;
    } catch (error) {
        return error;
    }
};

const getPlayerDetails = async (playerid) => {
    try {
        const searchURL = `${config.url}/named.player_info.bam?sport_code=%27mlb%27&player_id=%27${playerid}%27'`
        const response = await superagent.get(searchURL);

        return response.body;
    } catch (error) {
        return error;
    }
};

module.exports = {
    doPlayerSearch,
    getPlayerDetails
};
