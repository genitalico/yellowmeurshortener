const Joi = require('joi');

exports.newUrlPostSchema = Joi.object({
    url: Joi.string().required().pattern(new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/))
});