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
    let res = {};
    res.status = Object.keys(validator).length == 0 ? true : false;
    res.errors = validator;
    return res;
}

const useValidator = (body, rules, res, next) => {
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
    let resp = {};
    resp.status = Object.keys(validator).length == 0 ? true : false;
    resp.errors = validator;
    if (!resp.status) {
        return res.status(422).send({ errors: validator })
    }
    next();
    return resp;
}

module.exports = {
    validate,
    useValidator
};