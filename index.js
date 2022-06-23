'use strict';

const validate = (body, rules) => {
    let validator = {};
    rules.map((rule) => {
        if (rule.required) {
            let key = rule.key;
            if (!body[key]) {
                validator[key] = `${key} is required`
            } else {
                if (rule.validator) {
                    let valid = rule.validator(key, body[key]);
                    if (valid) {
                        validator[key] = valid;
                    }
                } else if (rule.type == 'email') {
                    let regex = /\S+@\S+\.\S+/;
                    if (!regex.test(body[key])) {
                        validator[key] = `${key} is invalid`;
                    }
                }
            }
        }
    })
    return Object.keys(validator).length == 0 ? true : validator
}

exports.validate;