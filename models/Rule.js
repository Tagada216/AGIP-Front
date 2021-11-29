export default {
    rules: {
        date_debut: [
            {
                required: true,
                message: 'Champ non rempli',
                trigger: 'change',
            },
        ],
        description: [
            {
                required: true,
                message: 'Champ non rempli',
                trigger: 'blur',
            },
        ],
        description_contournement: [
            {
                required: false,
                message: 'Champ non rempli',
                trigger: 'blur',
            },
        ],
        plan_action: [
            {
                required: false,
                message: "Plan d'action",
                trigger: 'blur',
            },
        ],
        action_retablissement: [
            {
                required: false,
                message: 'Action de rétablissement',
                trigger: 'blur',
            },
        ],
        priorite_id: [
            {
                required: true,
                message: 'Champ non rempli',
                trigger: 'change',
            },
        ],
        statut_id: [
            {
                required: true,
                message: 'Champ non rempli',
                trigger: 'change',
            },
        ],
        applicationImpactee: [
            {
                required: true,
                message: 'Champ non rempli',
                trigger: 'blur',
            },
        ],
    },
}