import { Injectable } from '@nestjs/common';
import * as buildingsMOCK from './mocks/buildings.json';
import * as checklistsMOCK from './mocks/checklists.json';
import * as membersMOCK from './mocks/members.json';
import * as configMOCK from './mocks/members.json';
import { IBuilding } from './model/building';
import { CacheService } from './cache/cache.service';
import { CONFIG } from './config';
import { IChecklist } from './model/checklist';
import { IMember } from './model/member';
import { IConfigurationData } from './model/config';

@Injectable()
export class AppService {
  constructor(private cacheService: CacheService) {}

  async clearCache(): Promise<void> {
    await this.cacheService.clear();
  }

  async getBuilding(id: string): Promise<IBuilding> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.building.label}-${id}`,
    );
    if (cachedData) {
      return cachedData;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = buildingsMOCK.find((building) => building.id === id);

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.building.label}-${id}`,
      data,
      CONFIG.building.ttl,
    );

    return data;
  }

  async getChecklist(id: string): Promise<IChecklist> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.checklists.label}-${id}`,
    );
    if (cachedData) {
      return cachedData;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = checklistsMOCK.find((checklist) => checklist.id === id);

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.checklists.label}-${id}`,
      data,
      CONFIG.checklists.ttl,
    );

    return data;
  }

  async getMember(id: string): Promise<IMember> {
    // Get data from cache
    const cachedData = await this.cacheService.get(
      `${CONFIG.members.label}-${id}`,
    );
    if (cachedData) {
      return cachedData;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = membersMOCK.find((member) => member.id === id);

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.members.label}-${id}`,
      data,
      CONFIG.members.ttl,
    );

    return data;
  }

  async getConfig(): Promise<IConfigurationData> {
    // Get data from cache
    const cachedData = (await this.cacheService.get(
      `${CONFIG.config.label}`,
    )) as IConfigurationData;
    if (cachedData) {
      return cachedData;
    }

    // If data is not cached, fetch it from the datasource
    await this.mockDelay(2000);
    const data = configMOCK;

    // Cache the data with a specific TTL
    await this.cacheService.set(
      `${CONFIG.config.label}`,
      data,
      CONFIG.config.ttl,
    );

    return data as IConfigurationData;
  }

  mockDelay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
