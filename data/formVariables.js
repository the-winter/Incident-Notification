const injuryTypes = ["Contusion", "Burn",
    "Dislocation",
    "Amputatuion",
    "Laceration",
    "Superficial",
    "Foreign Body",
    "Internal Injury",
    "Concussion",
    "Sprain/strain",
    "Fracture",
    "Dermatitis",
    "Other"
]

const injuryLocation = ["Head/face",
    "Eye",
    "Internal organs",
    "Hand/Fingers",
    "Laceration",
    "Shoulder/arms",
    "Trunk (other than back)",
    "Leg",
    "Foot/toes",
    "Back",
    "Other"
]

const formDefaults = {
        name: '',
        nature: '',
        injuryType: [],
        injuryLocation: [],
        hazards: [{
            safetyHazard: '',
            hazardDescription: '',
            riskLevel: '',
            controlMeasures: ''
        }],
        date: '',
        user: {
            fname: '',
            lname: ''
        }
}


module.exports = {
    injuryTypes,
    injuryLocation,
    formDefaults
};
