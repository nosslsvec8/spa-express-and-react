const db = require('../services/db');

module.exports = function validator(validatorSchemaArr) {
    return async (req, res, next) => {
        const errors = [];
        Object.entries(validatorSchemaArr).forEach(([fieldName, rules]) => {
            rules.forEach(rule => {
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
                    default:
                }
            })
        });

        for (const [fieldName, rules] of Object.entries(validatorSchemaArr)) {
            for (const rule of rules) {
                const [ruleName, ...ruleParams] = rule.split(':');
                if (ruleName === 'unique') {
                    switch (ruleParams[1]) {
                        case 'create':
                            const findByEmailForCreate = await db.select().from(ruleParams[0]).where({email: req.body[fieldName]});
                            if (findByEmailForCreate.length) {
                                errors.push({
                                    [fieldName]: `${fieldName}: such a value already exists! Try something else.`
                                });
                            }
                            break;
                        case 'update':
                            const currentUser = req.user[0];
                            const findByEmail = await db.select().from(ruleParams[0]).where({email: req.body[fieldName]});
                            if (findByEmail.length && currentUser.email !== findByEmail[0].email) {
                                errors.push({
                                    [fieldName]: `${fieldName}: such a value already exists! Try something else.`
                                });
                            }
                            break;
                        default:
                    }
                }
            }
        }
        if (!errors.length) {
            return next();
        }

        res.status(422).send(errors);
    };
};
