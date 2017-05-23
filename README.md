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

## CustomerObject - Detailed Example

```
{
  "customer": "Peninsula Trading",
  "jsonFile": {
    "widgets_edd_days_remaining_sub_content": "days left",
    "widgets_edd_image_component_status_delivered": "delivered",
    "tracking_delivery_schedule_avail_status": "Schedule your delivery",
    "tracking_status_exception_weather": "Weather Delay",
    "widgets_contact_title": "Need Help",
    "widgets_tracking_status_delivered_status_code": "DELIVERED",
    "widgets_tracking_status_itpp_intran_status": "In Transit to Pickup Point",
    "widgets_edd_today": "Today",
    "widgets_new_sms_signup_error": "Please enter a valid phone number.",
    "widgets_survey_feedback_stars_rating_text": "Rate your shipping experience",
    "widgets_sms_sms_update_header": "Update your number",
    "widgets_shipping_activity_carrier_handoff_tooltip_link_title": "What is this?",
    "tracking_status_exception_carrier_delay": "Carrier Delay",
    "widgets_footer_narvar_terms": "Terms of Use",
    "template_support_card_image_title": "New Arrivals",
    "widgets_edd_where_is_my_package_link_title": "Trying to find your package?",
    "tracking_status_exception_undeliv": "Undeliverable",
    "widgets_tracking_status_dlpp_deliv_status": "Delivered to a Pickup Point",
    "template_marketing_delivered_panel_title": "Delivery Date",
    "widgets_tracking_status_delivered_status": "Delivered",
    "widgets_return_status_print_label": "Print Your Return Label",
    "tracking_status_exception_deliv_sender": "Undeliverable: Received by Sender",
    "widgets_return_survey_feedback_stars_rating_adjectives": "Terrible,Bad,Ok,Good,Excellent",
    "widgets_return_edd_how_is_this_calculated_link_title": "When can I expect my refund?",
    "template_returns_canceled_status_panel_title": "Return Canceled",
    "widgets_return_sms_show_success_message": "false",
    "widgets_tracking_status_justshipped_status_code": "JUSTSHIPPED"
  },
  "optionsFile": {  // Any language not needed, is just left off the optionsFile obj
    "english": true,
    "french": true,
    "manderin": true,
    "cantonese": true,
    "japanese": true
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
This project is using json-2-csv from npm.  For docs, go to [json2csv](https://www.npmjs.com/package/json2csv)

