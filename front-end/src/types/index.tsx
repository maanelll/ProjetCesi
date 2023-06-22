export interface IEntreprise {
  id: number;
  name: string;
  activity_area: string;
  nb_cesi: number;
  localities: ILocalite[];
}

export interface ILocalite {
  id: number;
  adress: string;
  code_postal: string;
  city: string;
}
export interface IEtudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motdepasse: string;
  centre: string;
  promotion: string;
}
export interface ICentre {
  id: number;
  centre: string;
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
  entreprise_name: string;
  localite: string;
}
export interface ICompetence {
  [x: string]: any;
  id: number;
  comp: string;
}
export interface IPromotion {
  id: number;
  promo: string;
}
