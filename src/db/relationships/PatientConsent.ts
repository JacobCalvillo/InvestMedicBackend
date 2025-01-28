import Consent from "../models/Consent"
import Patient from "../models/Patient"

Consent.belongsToMany(Patient, {
    through: "Patient_Consent",    
})