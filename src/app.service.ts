import { Injectable } from '@nestjs/common';
import * as dbMOCK from './mocks/db.json';
import { IBuildingResponse } from './model/building';
import { CacheService } from './cache/cache.service';
import { CONFIG } from './config';
import { IChecklistResponse } from './model/checklist';
import { IConfigurationData } from './model/config';
import { IProject } from './model/project';
import { IMemberResponse } from './model/member';

@Injectable()
export class AppService {
  constructor(private cacheService: CacheService) {}

  async clearCache(): Promise<void> {
    await this.cacheService.clear();
  }

  async getBuilding(
    id: string,
    locationType: string,
  ): Promise<IBuildingResponse> {
    if (locationType === 'building') {
      // Get data from cache
      const cachedData = await this.cacheService.get(
        `${CONFIG.building.label}-${id}`,
      );
      if (cachedData) {
        return cachedData as IBuildingResponse;
      }

      // If data is not cached, fetch it from the datasource
      await this.mockDelay(2000);
      const data = dbMOCK.projects.find(
        (project) => project.id === id,
      ) as IProject;
      const response: IBuildingResponse = {
        buildings: data.buildings,
      };

      // Cache the data with a specific TTL
      await this.cacheService.set(
        `${CONFIG.building.label}-${id}`,
        response,
        CONFIG.building.ttl,
      );

      return response;
    } else {
      return null;
    }
  }

  async getChecklist(id: string): Promise<IChecklistResponse> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.checklists.label}-${id}`,
    );
    if (cachedData) {
      return cachedData as IChecklistResponse;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = dbMOCK.projects.find(
      (project) => project.id === id,
    ) as IProject;
    const response: IChecklistResponse = {
      checklists: data.checklists,
    };

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.checklists.label}-${id}`,
      response,
      CONFIG.checklists.ttl,
    );

    return response;
  }

  async getMember(id: string): Promise<IMemberResponse> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.members.label}-${id}`,
    );
    if (cachedData) {
      return cachedData as IMemberResponse;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = dbMOCK.projects.find(
      (project) => project.id === id,
    ) as IProject;
    const response: IMemberResponse = {
      members: data.members,
    };

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.members.label}-${id}`,
      response,
      CONFIG.members.ttl,
    );

    return response;
  }

  async getConfig(id: string): Promise<IConfigurationData> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.config.label}-${id}`,
    );
    if (cachedData) {
      return cachedData as IConfigurationData;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = dbMOCK.projects.find(
      (project) => project.id === id,
    ) as IProject;
    const response: IConfigurationData = data.projectConfiguration;

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.config.label}-${id}`,
      response,
      CONFIG.config.ttl,
    );

    return response;
  }

  mockDelay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
