export interface IEntreprise {
    id: number
    name: string
    activity_area: string
    nb_cesi:number
    localite: ILocalite[]
}

export interface ILocalite {
    id: number
    address: string
    code_postal: string
    city: string
}