import IdentificationUser from "../models/IdentificationUser";
import IdentificationType from "../models/IdentificationType";

IdentificationUser.belongsTo(IdentificationType, {
    foreignKey: 'identificationTypeId',
    as: 'identificationType'
});


IdentificationType.hasMany(IdentificationUser, {
    foreignKey: 'identificationTypeId',
    as: 'identificationUser'
});
