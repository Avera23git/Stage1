# Number Classification API

## Description
This API classifies a number and returns interesting mathematical properties along with a fun fact.

## API Endpoint
`GET /api/classify-number?number={number}`

### Query Parameters
- `number`: An integer to classify.

### Response Format
#### 200 OK
```json
{{
    "number": 311,
    "is_prime": true,
    "is_perfect": false,
    "properties": [
        "odd"
    ],
    "digit_sum": 5,
    "fun_fact": "311 is an uninteresting number."
}
