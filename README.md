## Crypto Currency Listing Table using React JS

Download the source code and install the following modules:

### MongoDB

 `npm install mongodb`  &  `npm install mongoose`

- for database connection

#### npm install axios

- to fetch the data from a public API

- public API for retrieving crypto currency data. [https://p.nomics.com/cryptocurrency-bitcoin-api]

#### UI Frameworks used

- Bootstrap 
- React-Bootstrap

##### `npm install font-awesome` 

- for search icon

##### Routing modules

- npm install react-router-dom
- npm install react-router

#### `npm start` 

-  to run the react application

#### `node connection.js` 

- to start the node server

#### Crypto Currency Application


http://localhost:3000/home - displays Crypto Currency listing data

- Data table with search and pagination functionalities
- Save button to store the record into mongodb
- View button to navigate to /view (Saved table)

http://localhost:3000/view - displays data that has been saved to mongodb database

- Saved Table with delete button to delete saved data from local database
- Back button to navigate to /home (Crypto currency table)

#### `Both pages have Draggable Hero Cards on the top of the table`

