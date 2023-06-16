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
export interface IUser {
    id: number
    firstName: string
    lastName:string
    email: string
    password:string
    role: string
    promotions: IPromotion[]
    center:string
    promotion:string
}
export interface ICenter {
    id: number
    centerName:string
}
export interface IPromotion {
    id: number
    promo:string
}