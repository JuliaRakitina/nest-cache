export interface IBuilding {
  id?: string;
  buildingName?: string;
  address?: string;
}

export interface IBuildingResponse {
  buildings: IBuilding[];
}
