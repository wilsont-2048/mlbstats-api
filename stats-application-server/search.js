const router = require('express').Router();

const mlb = require('mlbstats-api');
const { restart } = require('nodemon');

const _formatPlayers = (players) => {
    return players.map((player) => {
        return {
            player_id: player.player_id, name: player.name_display_first_last + ", " + player.team_full
        };
    });
};

// GET /search/player
router.get('/player', async (req, res) => {
    try {        
        const { name } = req.body;

        if(name) {
            const searchResults = await mlb.doPlayerSearch(name);

            const resultSize = Number(searchResults.search_player_all.queryResults.totalSize);
    
            let result;
    
            if (resultSize === 0) {
                result = [{ result: `No results were returned. Try again.`}];
            } else if (resultSize === 1) {
                result = _formatPlayers([searchResults.search_player_all.queryResults.row]);
            } else if (resultSize > 1) {    
                result = _formatPlayers(searchResults.search_player_all.queryResults.row);
            }
    
            const data = {
                searchKeyword: name,
                resultCount: resultSize,
                results: result
            };
            
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: `Required parameter was not received.`});
        }
    } catch (error) {
        res.status(500).json({ error: `Search was not able to be performed.`});
    }
});

// GET /search/player/details
router.post('/player/details', async (req, res) => {
    try {
        const { selectId, searchKeyword, resultCount } = req.body;
        
        if(selectId && searchKeyword && resultCount) {
            const results = await mlb.getPlayerDetails(selectId);
    
            const details = results.player_info.queryResults.row;
    
            const result = {
                player_name: details.name_display_first_last,
                jersey_number: details.jersey_number,
                team: details.team_name,
                primary_position: details.primary_position_txt,
                birth_city: details.birth_city,
                birth_state: details.birth_state === '' ? 'Unknown' : details.birth_state,
                birth_country: details.birth_country,
                height: "Height: " + details.height_feet + " ft., " + details.height_inches + " in.",
                weight: details.weight + " lbs."
            };
    
            const data = {
                keyword: searchKeyword,
                counts: resultCount,
                selectedId: selectId,
                selectedText: result,
                timestamp: new Date()
            }

            const db = req.app.locals.db;
            const collection = db.collection('Results');
    
            await collection.insertOne(data);
    
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: `Required parameters were not received.`});
        }
    } catch (error) {
        res.status(500).json({ error: `Player details were not able to be obtained.`});
    }
});

module.exports = router;
