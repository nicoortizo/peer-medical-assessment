const validateProperties = (entity, propertiesAllowed)=>  {
    const entityProperties = Object.keys(entity);
    if(!entityProperties.every((property) => propertiesAllowed.includes(property))) {
       return false;
    }
    return true;
}

module.exports = {
    validateProperties
}