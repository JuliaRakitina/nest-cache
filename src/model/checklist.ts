export interface IChecklist {
  id?: string;
  title?: string;
  locationIds?: string[];
}

export interface IChecklistResponse {
  checklists: IChecklist[];
}
