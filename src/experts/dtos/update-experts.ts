import { PartialType } from '@nestjs/swagger'
import CreateExpertsDto from './create-experts'

export default class updateExpertsDto extends PartialType(CreateExpertsDto) {}
