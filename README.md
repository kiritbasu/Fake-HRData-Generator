# Fake-HRData-Generator

Just a simple script to generate fake PII rich data that looks like an employee record.

To install :

- Install NodeJS

- `npm install chance`
- `npm install cluster`

(the last param is the number of concurrent threads you want to run to generate a lot of data in parallel)
- `node fake-hrdata-generator.js 1`

# Sample output
```JSON
 {
  "employee_id": "E049220",
  "first_name": "May",
  "last_name": "Nucci",
  "email": "May.Nucci@AvistaCorporation.com",
  "home_phone": "03 89 20 98 10",
  "country": "fr",
  "hire_date": "7/10/2001",
  "job_description": {
    "job_id": 20,
    "title": "Loan Officer",
    "salary": "196,049.84€",
    "stock_options": 80435
  },
  "dependent": {
    "first_name": "Lelia",
    "last_name": "Nucci",
    "relationship": "Wife"
  },
  "home_address": {
    "street_name": "266 Owas Ct",
    "city": "Bormadbi",
    "country": "fr",
    "postal_code": "14600"
  }
}
```
