import MedicalPractitionerService from "../models/MedicalPractitionerService";
import MedicalPractitioner from "../models/MedicalPractitioner";
import Service from "../models/Service";

Service.belongsToMany(MedicalPractitioner, {
    through: MedicalPractitionerService,
    foreignKey: 'service_id'
})

MedicalPractitioner.belongsToMany(Service, {
    through: MedicalPractitionerService,
    foreignKey: 'medical_practitioner_id'
})
