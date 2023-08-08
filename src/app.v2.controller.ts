import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';
import { IChecklistResponse } from './model/checklist';

@Controller('v2')
export class AppV2Controller {
  constructor(private readonly appService: AppService) {}

  @Get('checklist')
  @ApiQuery({ name: 'projectId', type: String })
  public async getChecklist(
    @Query('projectId') id: string,
  ): Promise<IChecklistResponse> {
    return this.appService.getChecklist(id);
  }
}
