import Specialty from "../models/Specialty"
import MedicalPractitioner from "../models/MedicalPractitioner"
import MedicalPractitionerSpecialty from "../models/MedicalPractitionerSpecialty"

Specialty.belongsToMany(MedicalPractitioner, {
    through: MedicalPractitionerSpecialty,
    foreignKey: 'specialty_id'
})