## Add your local config file

For Dev, create a file => server/config/config.js

Add below and fill in (config.js is in gitignore)

```
module.exports = {
  mlab: {
    dbuser: 'your_mlab_account',
    dbpassword: 'your_mlab_password'
  },

  expJwt: {
    scrt: 'Shhhhh!'
  },

}; 
```


Flow
- BEFORE FLOW: JSON is downloaded to pc from from HUB
1) Customer name is filled in and language options are selected
2) Json is uploaded to client and Posted to server with customerName and with language options
3) Post to DB with customerName, jsonFile, languageOptionsJson
4) Server uses languageOptionsJson to parse out relevent fields from jsonFile.  Creates new filteredJson which is converted to CSV
5) CSV is sent in response to Client.
6) User downloads CSV.
- CSV is filled out by customer
7) CSV is uploaded to client with customerName
8) CSV is posted to server.  Server converts to JSON.  Server uses customerName to get json File from DB and converts to object.  All relevent values are overwritten.  Server stringafies updated jsonFile, puts to DB, and sends jsonFile to client as responce.   
IN THE FUTURE: A Get to get a customer's jsonFile

CustomerObject {
	customerName,
	jsonFile,
	Options {
		english: true,
		french: false,
		navajo: false
		esperanto: true,
		etc: etc
	}
}

Routes:
```
Route(/entry) {}
	Get(customerName):  get a single jsonFile belonging to the customer
		returns responce -> jsonFile

	Post(customerObject): 
		- create a customer with their jsonFile and languageOptions in the DB
		- toolKit functions filter relevent languages from jsonFile and create a jsonFileSnippet
		- toolKit functions convert jsonFileSnippet to CSV
		return response -> CSV

	Put(customerName, CSV): update a customer's jsonFile with their filled in CSV
		- toolKit functions convert CSV to jsonFileSnippet and is linted
		- Get to DB with customerName bring sup jsonFile
		- jsonFile's relevent fields are overwritten by jsonFileSnippet
		- put updated jsonFile to DB
		return response -> jsonFile

	Delete(customerName): deletes customer and their jsonFile
		returns response -> CustomerObject
}
```