## Project Structure

The project is divided into two apps:

1. A React powered frontend, created using [Create React App](https://create-react-app.dev/)
2. A backend, powered by [AdonisJs](https://docs.adonisjs.com/) and a MySQL database, exposing a REST API

## Setup instructions

Follow these instructions to get the project up and running:

1. Install Node.js.

  Make sure you have [Node](https://nodejs.org/en/download/) >= v8.10 installed on your machine.

2. Install Yarn.

  Make sure you have [Yarn](https://classic.yarnpkg.com/en/docs/install) v1 installed on your machine.


3. Install dependencies.

    This will install the Node dependencies for both projects at once.

    ```bash
    cd jembi-fhir-server/
    yarn
    ```

4. Run migrations

    ```bash
    yarn workspace backend node ace migration:run
    ```

5. Start the two apps

    ```bash
    yarn workspace backend

    cd backend/
    yarn workspace frontend
    ```

  You only need to start the backend application for this demo

6. And, you're all set up!

## Working on the app

### Running tests

```bash
yarn workspace backend test test/ObservationsEndpoint.ts
```

### Running lint fix

```bash
yarn lint
```

```bash
yarn lint:fix
```

### Creating a resource

```bash
curl -L -X POST "http://127.0.0.1:<port>/v1/Observations" \
-H "Content-Type: application/json" \
--data-raw '{ "resourceType" : "Observation", ... }'
```

  Alternatively, you should use an API testing tool like [Postman](https://www.postman.com/) for convenience

  **NB: Remember to use adapted request body sample in the Assumptions about app section.** 


### Querying a resource

```bash
curl -L -X GET "http://127.0.0.1:<port>/v1/Observations?category=vital-signs&code=LOINC"
```

  Where ```LOINC``` is a string value for the code

  **NB: Multi code search i.e ```...&code=[LOINC{,LOINC2...}]``` is not implemented** 

```bash
curl -L -X GET "http://127.0.0.1:<port>/v1/Observations?category=vital-signs&date=[date]"
```

```bash
curl -L -X GET "http://127.0.0.1:<port>/v1/Observations?category=vital-signs&date=[date]{&date=[date]}"

```

  The query parameter and value ```?category=vital-signs``` should be added otherwise an error will returned.

  The database needs to populated with sufficient data for running queries against the API.

## Assumptions about the app

1. The structure of the ```POST``` request body resembles the ```Observation``` resource [here](https://www.hl7.org/fhir/observation.html)

Here's the adapted structure of the request body

```
{
  "resourceType" : "Observation",
  // from Resource: id, meta, implicitRules, and language
  // from DomainResource: See jembi-fhir-server/backend/app/Models/DomainResource
  "identifier" : [{ Identifier }], // Business Identifier for observation
  "status" : "<code>", // R!  registered | preliminary | final | amended +
  "code": { CodeableConcept }, // R!  Type of observation (code / type)
  "effectivePeriod" : { Period },
  "issued" : "<instant>", // Date/Time this version was made available
  "valueQuantity": { Quantity },
  "interpretation": [
    { 
      "low" : { Quantity(SimpleQuantity) }, // C? Low Range, if relevant
      "high" : { Quantity(SimpleQuantity) }, // C? High Range, if relevant
      ...
      "text" : "<string>" // Text based reference range in an observation
    }
  ]
}
```

Here's a sample of the adapted request body

```
{
  "identifier": [
    {
      "use": "official",
      "system": "http://www.bmc.nl/zorgportal/identifiers/observations",
      "value": "6325"
    }
  ],
  "status": "final",
  "code": {
    "text": "Negative for Chlamydia Trachomatis rRNA",
    "coding": [
      {
        "system": "http://loinc.org",
        "symbol": "11557-6",
        "display": "Carbon dioxide in blood"
      }
    ]
  },
  "effectivePeriod": {
    "start": "2013-04-02T10:30:10+01:00",
    "end": "2013-04-05T10:30:10+01:00"
  },
  "issued": "2013-04-03T15:30:10+01:00",
  "valueQuantity": {
    "value": 6.2,
    "unit": "kPa",
    "system": "http://unitsofmeasure.org",
    "code": "kPa"
  },
  "interpretation": [
    {
      "coding": [
        {
          "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
          "code": "H",
          "display": "High"
        }
      ]
    }
  ],
  "referenceRange": [
    {
      "text": "Text based reference range in an observation",
      "low": {
        "value": 4.8,
        "unit": "kPa",
        "system": "http://unitsofmeasure.org",
        "code": "kPa"
      },
      "high": {
        "value": 6.0,
        "unit": "kPa",
        "system": "http://unitsofmeasure.org",
        "code": "kPa"
      }
    }
  ]
}
```

2. Data to the ```POST``` endpoint has beeen validated on frontend and can be reasonably realied on.

2. Several attributes were ommited from the ```Observation``` model under ```jembi-fhir-server/backend/app/Models/Observation``` to make scope manageable.

3. ```Observation``` and ```DomainResource``` have a [```hasOne```](https://docs.adonisjs.com/guides/models/relationships) relationship. An ```Observation``` has one ```DomainResource``` associated with it at the time of its creation and that this ```DomainResource``` houses the logical ID and meta information which is populated by default.

4. ```Resource``` and ```DomainResource``` have been merged into one representation to make scope manageable. You'll find some attributes from ```Resource``` such as ```id``` referenced in ```DomainResource```.

6. In the interest of time, the exercise didn't focus developing extensive unit tests and generating seed values for extensive testing.

7. The response has been standardised under ```jembi-fhir-server/backend/contracts/interfaces/ObservationsInterface```

8. ```ReferenceRange``` accepts a single instance of even though it has a ```hasMany``` relationship with the parant model ```Observation```. The first object will be read from the array passed to it **only**.
