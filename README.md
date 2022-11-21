# mlbstats-api v1.0.2
Node.js application to do active MLB player search that saves single query searches.

## Features
- Pull list of all active players matching name search keyword.
- Obtain specific details of a player based on selected player id.
- Review history of previous searches of specific players.

## Running Application
Execute the following command in terminal while inside the *stats-application-server* folder:
```node server.js```.

## How-To-Use

The application can be accessed at ```http://localhost:8888```.

### Search for active player
Simple search for active player by name can be done by performing a GET request at ```http://localhost:8888/search/player``` using a JSON object with keyword *name*.

Example:
```
{
    "name": "turner"
}
```
Example Results:
```
{
    "searchKeyword": "turner",
    "resultCount": 3,
    "results": [
        {
            "player_id": "457759",
            "name": "Justin Turner, Los Angeles Dodgers"
        },
        {
            "player_id": "642156",
            "name": "Stuart Turner, Cincinnati Reds"
        },
        {
            "player_id": "607208",
            "name": "Trea Turner, Los Angeles Dodgers"
        }
    ]
}
```

### Obtain specific details of player

To obtain details about a specific player based on a *player_id* from the search results, a POST request can be done at ```http://localhost:8888/search/player/details``` by adding the keyword *selectId* in the search results JSON object.

Example:
```
{
    "selectId": "607208",
    "searchKeyword": "turner",
    "resultCount": 3,
    "results": [
        {
            "player_id": "457759",
            "name": "Justin Turner, Los Angeles Dodgers"
        },
        {
            "player_id": "642156",
            "name": "Stuart Turner, Cincinnati Reds"
        },
        {
            "player_id": "607208",
            "name": "Trea Turner, Los Angeles Dodgers"
        }
    ]
}
```

Example Result:
```
{
    "keyword": "turner",
    "counts": 3,
    "selectedId": "607208",
    "selectedText": {
        "player_name": "Trea Turner",
        "jersey_number": "6",
        "team": "Los Angeles Dodgers",
        "primary_position": "SS",
        "birth_city": "Boynton Beach",
        "birth_state": "FL",
        "birth_country": "USA",
        "height": "Height: 6 ft., 2 in.",
        "weight": "185 lbs."
    },
    "timestamp": "",
    "_id": ""
}
```

### Review list of previous searches

To obtain the list of previously searched players, a GET request can be done at ```http://localhost:8888/history/search```. 

Example Results:
```
[
    {
        "_id": "",
        "keyword": "turner",
        "counts": 3,
        "selectedId": "607208",
        "selectedText": {
            "player_name": "Trea Turner",
            "jersey_number": "6",
            "team": "Los Angeles Dodgers",
            "primary_position": "SS",
            "birth_city": "Boynton Beach",
            "birth_state": "FL",
            "birth_country": "USA",
            "height": "Height: 6 ft., 2 in.",
            "weight": "185 lbs."
        },
        "timestamp": ""
    }
]
```

## Requirements

### MongoDB

A valid connection to a database deployment in MongoDB is required. Connection details can be modified in the ```config.json``` file inside folder *stats-application-server*.

### npm packages

- cors v2.8.5
- express v4.18.1
- mongodb v4.5.0
- nodemon v2.0.16
