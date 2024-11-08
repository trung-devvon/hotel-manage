const customValidate = (joiSchema) => (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    if (error) throw new Error(error.detail[0].message?.replaceAll('\"', ''))
    next()
}
module.exports = customValidate