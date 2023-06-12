export interface IEntreprise {
    id: number
    nom: string
    secteur_act: string
    nb_stage_cesi:number
    localite: ILocalite[]
}

export interface ILocalite {
    id: number
    nom:string
}
export interface IEtudiant {
    id: number
    nom: string
    prenom:string
    email: string
    motdepasse:string
    centre: string
    promotion :string
}
export interface ICentre {
    id: number
    centre:string
}
export interface IPromotion {
    id: number
    prom:string
}