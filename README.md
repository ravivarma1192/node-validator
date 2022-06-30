nodeinputform-validator

Node input formvalidator is to validate form input

## How to use?

```javascript
let isValid = validate(req.body, [
  {
    key: "userid",
    required: true,
  },
  {
    key: "queryid",
    required: true,
    type: "email", //optional parameters (email, phone, string)
  },
]);
```

isValid will return with true or error in the request data

we can use callback method to add custom validation rule

## Example :

````javascript
{
    key: "queryid",
    required: true,
    validator: (key, value) =>{
        //use your own logic here and return error in string or true
    }
```

## Use as middleware

instead of validate function you can use as a middleware

## Example
```javascript
(req, res, next) => useValidator(req.body, [
    {
        key: "userid",
        required: true
    }, {
        key: "queryid",
        required: true,
    }
], res, next)

```


````
