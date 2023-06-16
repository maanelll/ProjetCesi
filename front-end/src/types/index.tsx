export interface IEntreprise {
    id: number
    name: string
    activity_area: string
    nb_cesi:number
    localities: ILocalite[]
}

export interface ILocalite {
    id: number
    adress: string
    code_postal: string
    city: string
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