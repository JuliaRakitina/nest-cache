import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IBuildingResponse } from './model/building';
import { ApiQuery } from '@nestjs/swagger';
import { IConfigurationData } from './model/config';
import { IMemberResponse } from './model/member';

@Controller('v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('clear-cache')
  clearCache(): Promise<void> {
    return this.appService.clearCache();
  }

  @Get('structure')
  @ApiQuery({ name: 'projectId', type: String })
  @ApiQuery({ name: 'locationType', type: String })
  public async getBuilding(
    @Query('projectId') projectId: string,
    @Query('locationType') locationType: string,
  ): Promise<IBuildingResponse> {
    return this.appService.getBuilding(projectId, locationType);
  }

  @Get('project/:projectId')
  public async getMember(
    @Param('projectId') projectId: string,
    @Query('fields') fields: Array<string>,
  ): Promise<IMemberResponse> {
    console.info(fields);
    if (fields && fields.includes('member')) {
      return this.appService.getMember(projectId);
    } else {
      return null;
    }
  }

  @Get('config')
  @Get('configurations')
  @ApiQuery({ name: 'projectId', type: String })
  public async getConfig(
    @Query('projectId') projectId: string,
  ): Promise<IConfigurationData> {
    return this.appService.getConfig(projectId);
  }
}
