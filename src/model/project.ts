import { IBuilding } from './building';
import { IChecklist } from './checklist';
import { IMember } from './member';
import { IConfigurationData } from './config';

export interface IProject {
  id: string;
  buildings: IBuilding[];
  checklists: IChecklist[];
  members: IMember[];
  projectConfiguration: IConfigurationData;
}
