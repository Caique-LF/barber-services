import { PartialType } from '@nestjs/mapped-types'
import CreateExpertsDto from './create-experts'

export default class updateExpertsDto extends PartialType(CreateExpertsDto) {}
