const db = require('../services/db');

module.exports = function validator(validatorSchemaArr) {
    return async (req, res, next) => {
        const errors = [];
        for (const [fieldName, rules] of Object.entries(validatorSchemaArr)) {
            for (const rule of rules) {
                const [ruleName, ...ruleParams] = rule.split(':');
                switch (ruleName) {
                    case 'required':
                        if (!req.body[fieldName]) {
                            errors.push({
                                [fieldName]: `${fieldName} the field cannot be empty`
                            });
                        }
                        break;
                    case 'min':
                        if (req.body[fieldName]) {
                            const min = parseInt(ruleParams[0], 10);
                            if (req.body[fieldName].length < min) {
                                errors.push({
                                    [fieldName]: `${fieldName} the minimum value is ${min} characters. Too short!`
                                });
                            }
                        }
                        break;
                    case 'max':
                        if (req.body[fieldName]) {
                            const max = parseInt(ruleParams[0], 10);
                            if (req.body[fieldName].length > max) {
                                errors.push({
                                    [fieldName]: `${fieldName} the maximum value is ${max} characters. Too long!`
                                });
                            }
                        }
                        break;
                    case 'email':
                        if (req.body[fieldName]) {
                            const regular = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                            const isValid = regular.test(String(req.body[fieldName]).toLowerCase());
                            if (!isValid) {
                                errors.push({
                                    [fieldName]: `incorrect ${fieldName}!`
                                });
                            }
                        }
                        break;
                    case 'unique':
                        const findInDatabase = await db.select().from(ruleParams[0]).where({[fieldName]: req.body[fieldName]});
                        if (ruleParams[1] === 'create' && findInDatabase.length) {
                            errors.push({
                                [fieldName]: `${fieldName}: such a value already exists! Try something else.`
                            });
                        }

                        if (ruleParams[1] === 'update' && findInDatabase.length && req.user[0][fieldName] !== req.body[fieldName]) {
                            errors.push({
                                [fieldName]: `${fieldName}: such a value already exists! Try something else.`
                            });
                        }
                        break;
                    default:
                }
            }
        }

        if (!errors.length) {
            return next();
        }

        res.status(422).send(errors);
    };
};
