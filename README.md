This [Vue] app was initialized with [create-near-app]

#NCD
==================

This project is a very simple weekly appointment scheduler for psychologists. Where all the data is stored on the blockchain. Patients can create a appointment using this application.After they create a new appointment the price for that appointment will taken from their account and will be transferred to the contract. Moreover, the psychologist can view their appointments for the current week.



Quick Start
===========

To run this project locally:

1. Prerequisites: Make sure you've installed [Node.js] ≥ 12
2. Install dependencies: `yarn install`
3. Run the local development server: `yarn dev` (see `package.json` for a
   full list of `scripts` you can run with `yarn`)


Exploring The Code
==================

1. The "backend" code lives in the `/contract` folder. See the README there for
   more info.
2. The frontend code lives in the `/src` folder. `/src/main.js` is a great
   place to start exploring.
   
Functions
=========

psyGetOne
---------

- Takes _id_ as a parameter
- Given ID must be present on the blockhain.
- Returns an Psychologist object with given ID.

**Example call:**
`near call $CONTRACT psyGetOne '{"id": '$PSYID'}' --accountId $NEAR_ACCOUNT`

psyCreate
---------

- Takes _name_ and _price_ as a parameter
- returns the newly created Psychologist objct.

**Example call:**
`near call $CONTRACT psyCreate '{"name": '$PSYNAME',"price":$PSYPRICE}' --accountId $NEAR_ACCOUNT`

## updatePsy

- Takes _id_, _name_,and _price_ as a parameter.
- Fetches the Psychologist with given ID updates it with given parameters and stores it on the blockchain.
- returns updated Psychologist objetc

**Example call:**
`near call $CONTRACT updatePsy '{"id": '$PSYID',"name":"$PSYNAME","price":$PSYPRICE}' --accountId $NEAR_ACCOUNT`

## deletePsy

- Takes no parameters
- Deletes the Psychologist from blockchain with the id of the caller

**Example call:**
`near call $CONTRACT deletePsy --accountId $NEAR_ACCOUNT`

## getAllPsy

- Takes no parameters.
- Returns all Psychologist stored on the blockchain.

**Example call:**
`near call $CONTRACT getAllPsy --accountId $NEAR_ACCOUNT`

## patGetOne

- Takes _id_ as a parameter
- returns Patient with given id.

**Example call:**
`near call $CONTRACT patGetOne '{"id": '$PATID'}' --accountId $NEAR_ACCOUNT`

## patCreate

- Takes _name_ as a parameter
- Creates a new patient with given name and stores it on the blockchain.
- returns newly created patient object.

**Example call:**
`near call $CONTRACT patCreate '{"name":"$PATNAME"}' --accountId $NEAR_ACCOUNT`

## updatePat 

- Takes _id_ and _name_ as a parameter.
- Updates name of the patient with given id, and stores on the blockchain.
- returns updated Patient object.

**Example call:**
`near call $CONTRACT patUpdate '{"id":"$PATID","name":"$PATNAME"}' --accountId $NEAR_ACCOUNT`

## deletePat

- Takes no parameters
- Deletes the Patient from blockchain with the id of the caller

**Example call:**
`near call $CONTRACT deletePat --accountId $NEAR_ACCOUNT`

## patAppGetAll

- Takes _patID_ as a parameter.
- returns a map of appointmentid and appointments (appointmentId -> Appointment) of the given patient

**Example call:**
`near call $CONTRACT patAppGetAll '{"id":"$PATID"}' --accountId $NEAR_ACCOUNT`

## psyAppGetAll

- Takes _psyID_ as a parameter.
- returns a map of appointmentid and appointments (appointmentId -> Appointment) of the given psychologist

**Example call:**
`near call $CONTRACT psyAppGetAll '{"id":"$PATID"}' --accountId $NEAR_ACCOUNT`

## appCreate

- Takes _day_, _hour_, _psyId_, and _patId_ as parameters.
- Creates a new Appointment object and stores it on the blockchain.
- _day_ must be between 1 and 5 
- _hour_ must be between 1 and 9
- returns newly created appointment.

**Example call:**
`near call $CONTRACT appCreate '{"day":$PATDAY,"hour":$PATHOUR,"psyId":"$PSYID","patId":"$PATID"}' --accountId $NEAR_ACCOUNT`

## updateApp

- Takes _id_, _day_, _hour_, and _psyId_ as parameters.
- The id of the caller is used as the _patId_
- fetched the Appointment with given id from the blockchain.
- updates it and stores it back to the blockchain.
-  _day_ must be between 1 and 5 
- _hour_ must be between 1 and 9
- returns updated appointment.

**Example call:**
`near call $CONTRACT updateApp '{"id":"$APPID","day":$PATDAY,"hour":$PATHOUR,"psyId":"$PSYID"}' --accountId $NEAR_ACCOUNT`

## deleteApp

- Takes _id_ and _psyId_ as parameters
- uses caller id as _patId_
- deletes appointment with given ID from the blockchain.

**Example call:**
`near call $CONTRACT deleteApp '{"id":"$APPID",psyId":"$PSYID"}' --accountId $NEAR_ACCOUNT`

# Set the contract name in code

Modify the line in `src/config.js` that sets the account name of the contract.

    const CONTRACT_NAME = process.env.CONTRACT_NAME || 'near-blank-project.YOUR-NAME.testnet'


# Front-end
The front-end for this project was build using Vue as a framework.

In order to run the front-end locally you have to run the command:

    yarn dev


Loom Video 
==================

https://www.loom.com/share/6ea5cae5b2214ba5b8410db4c50aa870
