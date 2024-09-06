import { Controller, Post, Body } from '@nestjs/common';
import { createReportDto } from './dtos/create-report-Dto';
import { Report } from './report.entity';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reporsService: ReportsService) {}
  @Post()
  createReport(@Body() body: createReportDto) {}
}
