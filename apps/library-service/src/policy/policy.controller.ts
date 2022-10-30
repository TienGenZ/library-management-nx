import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePolicyDto } from './dto/createPolicy.dto';
import { UpdatePolicyDto } from './dto/updatePolicy.dto';
import { PolicyService } from './policy.service';

@Controller('/policy')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  })
)
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  findAll() {
    return this.policyService.findAll();
  }

  @Post()
  create(@Body() dto: CreatePolicyDto) {
    return this.policyService.create(dto);
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.policyService.findById(id);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() dto: UpdatePolicyDto) {
    return this.policyService.update(id, dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.policyService.delete(id);
  }
}
