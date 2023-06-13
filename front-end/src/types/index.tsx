export interface IEntreprise {
    id: number
    name: string
    activity_area: string
    nb_cesi:number
    localite: ILocalite[]
}

export interface ILocalite {
    id: number
    adress: string
    code_postal: string
    city: string
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