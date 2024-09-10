import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report-Dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/currrent-user.decorator';
import { User } from 'src/users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report-dto';
import { adminGaurd } from 'src/guards/admin.gaurd';
@Controller('reports')
export class ReportsController {
  constructor(private reporsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reporsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(adminGaurd)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reporsService.changeApproval(id, body.approved);
  }
}
