import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { IBuilding } from './model/building';
import { ApiQuery } from '@nestjs/swagger';
import { IChecklist } from './model/checklist';
import { IConfigurationData } from './model/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('clear-cache')
  clearCache(): Promise<void> {
    return this.appService.clearCache();
  }

  @Get('building')
  @ApiQuery({ name: 'id', type: String })
  public async getBuilding(@Query('id') id: string): Promise<IBuilding> {
    return this.appService.getBuilding(id);
  }

  @Get('checklist')
  @ApiQuery({ name: 'id', type: String })
  public async getChecklist(@Query('id') id: string): Promise<IChecklist> {
    return this.appService.getChecklist(id);
  }

  @Get('member')
  @ApiQuery({ name: 'id', type: String })
  public async getMember(@Query('id') id: string): Promise<IChecklist> {
    return this.appService.getMember(id);
  }

  @Get('config')
  public async getConfig(): Promise<IConfigurationData> {
    return this.appService.getConfig();
  }
}
