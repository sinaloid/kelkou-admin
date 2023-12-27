
const typePaiement = [
    { slug: "entree_d_argent", nom: "Entrée d'argent" },
    { slug: "sortie_d_argent", nom: "Sortie d'argent" },
]

const etatPaiement = [
    { slug: "en_attente", nom: "En attente" },
    { slug: "effectue", nom: "Effectué" },
    { slug: "annule", nom: "Annulé" },
]

const moyenPaiement = [
    { slug: "orange_money", nom: "Orange Money" },
    { slug: "moov_money", nom: "Moov Money" },
    { slug: "en_espece", nom: "En espèce" },

]

const profilePersonnel = [
    { slug: "manager", nom: "Manager" },
    { slug: "secretaire", nom: "Secretaire"},
    { slug: "marketing",nom: "Marketing"},
    { slug: "comptable",nom: "Comptable"},
    { slug: "gestionnaire",nom: "Gestionnaire",},
    { slug: "communication",nom: "Communication",},

]


export {
    typePaiement,
    profilePersonnel,
    moyenPaiement,
    etatPaiement
}