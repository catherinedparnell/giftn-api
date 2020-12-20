# giftn API

This pandemic is stressful enough without holiday shopping! **giftn** is an all-in-one application allowing users to easily track their gift lists, budgeting, and package deliveries.
We want to make planning for COVID-Holidays feel like a breeze.

![giftn Logo](/images/logo.png)

## Services
This API was built to handle CRUD operations to and from Google Cloud's Cloud Firestore database, as well as make API calls to external companies to get tracking number related information through the [UPS Tracking API](https://www.ups.com/us/en/services/technology-integration/online-tools-tracking.page?) and send auto-generated emails with a personal twist using [MailGrid](https://www.mailgun.com/). It services **giftn's** web app and Chrome extension.

## Documentation
* `/user/:username`
  
  POST - adds user `req.body = { name: the name of user }`
  
  GET - gets user and all corresponding information

* `/check/:username`

  GET - checks if user exists

* `/personGift/:personID`

  POST - adds gift to person `req.body = { gift: { name: the name, price: the price, link: the link, id: unique id } }`
  
  PUT - removes gift from person `req.body = { giftID: this gift ID }`

* `/person/:username`  

  POST - adds person to user `req.body = { person: { giftInfo: {}, name: their name, id: id } }`
  
  PUT - removes person from user `req.body = { personID: the person ID}`

* `/gift/:giftID`

  PUT - marks gift as bought `req.body = { personID: the person ID }`

* `/wishlist/:giftID`
  
  PUT - unmarks gift as bought (in wishlist) `req.body = { personID: the person ID }`

* `/budget/:username`
  
  PUT - updates budget `req.body = { budget: the budget }`

* `/tracking/:username`

  POST - adds tracking number to user `req.body = { toAddress: recipient email, toName: name of who it's to, fromName: name of who it's from, message: personalized note, trackingNumber: valid tracking number }`
  
  PUT - removes tracking number from user `req.body = { trackingNumber: tracking number }`

* `/getTracking/`
  
  GET - get UPS tracking status

* `/mail/`

  PUT - send automated email `req.body = { toAddress: recipient, fromName: name of who it's from, message: personalized note }` (for now)
