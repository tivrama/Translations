## Site
Translations is deployed on Heroku at [Translations.herokuapp](https://tranlations.herokuapp.com)

## Getting Started

- Make a fork and clone to your PC and cd into your project
- ```npm i```
- Create your config file (see below)
- ```npm start``` or ```nodemon```
- Open localhost:3000

## Add your local config file

For Dev, create a file ```cd server/config touch config.js```

Add below and fill in (config.js is in gitignore)

```
module.exports = {
  mlab: {
    dbuser: 'your_mlab_account',
    dbpassword: 'your_mlab_password'
  }
}; 
```

There are two mLab DB's: translation and translation-dev.  This can be toggled in server/db/db.  You can create a new user on mLab.com, or use the default.  

## Flow

- BEFORE FLOW: JSON is downloaded to pc from from HUB (Even with multiple languages, only one JSON is need at this point)
1) In UI, Customer name is filled in and language options are selected
2) JSON is uploaded to client and Posted to server with customerName and with language options
3) On the server, jsonFile is cloned for each language and pushed into an array. Post to DB with customerName, jsonFile array, language optionsJson
4) Server converts jsonFile array to CSV-string.  CSV column 1 has all json keys, then a column for each language.
5) CSV-string is sent in response to Client where it is converted to a CSV file which is automatically downloaded.
- CSV is filled out by customer
6) CSV is uploaded to client with customerName
7) CSV is stringified and posted to server.  Server converts to JSON.  
8) Server uses customerName to get json File from DB and converts to object.  All relevent values are overwritten.  
9) Server stringifies updated jsonFile, puts to DB, and sends jsonFile to client as response.  
- IN THE FUTURE: A Get, using customer name, to get a customer's jsonFile.


## CustomerObject

Customer object will have an autofilled _id and creation date.  It will have the customer name, a jsonFile which is an array of all the json Languages from Hub.
```
CustomerObject {
  customerName: string,           // Customer name
  jsonFile: stringifiedJSON,      // Array of json language files from Hub
  Options: stringifiedJSON => {   // All 'true's are counted.  For each language,
    english: true,                // a new json is added to the jsonFile array
    french: false,
    navajo: false
    esperanto: true,
    etc: etc
  }
}
```

## Routes:

```
Route(/entry) {
  Post(customerObject): (Flow step 2)
    - create a customer with their jsonFile and languageOptions in the DB
    - toolKit functions filter relevent languages from jsonFile and create a jsonFileSnippet
    - toolKit functions convert jsonFileSnippet to CSV
    return response -> CSV

  Put(customerName, CSV): update a customer's jsonFile with their filled in CSV (Flow step 8)
    - toolKit functions convert CSV to jsonFileSnippet and is linted
    - Get to DB with customerName bring sup jsonFile
    - jsonFile's relevent fields are overwritten by jsonFileSnippet
    - put updated jsonFile to DB
    return response -> jsonFile

  Get(customerName):  get a jsonFile array belonging to the customer
    returns response -> jsonFile array

  Delete(customerName): deletes customer and their jsonFile
    returns response -> CustomerObject
}
```


## Converting files
This project is using json-2-csv from npm.  For docs, go to [json-2-csv](https://www.npmjs.com/package/json-2-csv)

