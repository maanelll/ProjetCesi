export interface IEntreprise {
  id: number;
  name: string;
  activity_area: string;
  nb_cesi: number;
  localities: ILocalite[];
}

export interface ILocalite {
  [x: string]: any;
  id: number;
  adress: string;
  code_postal: string;
  city: string;
}
export interface IUser {
    id: number
    firstName: string
    lastName:string
    email: string
    password:string
    role: IRole
    promotions: IPromotion[]
    center:ICenter
}
export interface IRole {
  id: number;
  role: string;
}
export interface ICentre {
    id: number
    centre:string
}
export interface IPromotion {
    id: number
    promo:string
}
export interface ICenter {
    id: number
    center:string
}
export interface IOffrestage {
  id: number;
  internship_duration: number;
  compensation_basis: number;
  offer_date: Date;
  nb_places_offered: number;
  name: string;
  competence: ICompetence[];
  promotion: IPromotion[];
  localite_id: number;
  localite: ILocalite;
}
export interface IWishlist {
  id: number;
  offreStage_id : number
  name: string;
  internship_duration: number;
  compensation_basis: number;
  offer_date: Date;
  nb_places_offered: number;
  entreprise_name: string;
  
  competences: ICompetence[];
  promotion: IPromotion;
  localite: ILocalite;
}
export interface ICompetence {
  [x: string]: any;
  id: number;
  comp: string;
}
export interface IApplication {
  id: number;
  status: string;
  submission_date: Date;
  cv: string;
  motivation_letter: string;
  user_id: number;
  offreStage_id: number;
}

export interface INotification {
  id: number;
  title: string;
  message: string;
  status: string;
  notification_date: string;
}