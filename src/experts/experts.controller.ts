import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Res
} from '@nestjs/common'
import { ExpertsService } from './experts.service'
import CreateExpertsDto from './dtos/create-experts'
import { Response } from 'express'
import updateExpertsDto from './dtos/update-experts'

@Controller('experts')
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@Post()
	async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
		const expertExist = await this.expertsService.findExpertByEmail(data.email)

		if (expertExist) {
			throw new BadRequestException(
				'Já existe um profissional com o email informado'
			)
		}

		const expert = await this.expertsService.createExpert(data)
		return res.status(HttpStatus.CREATED).json(expert)
	}

	@Get()
	async getExperts(@Res() res: Response) {
		const experts = await this.expertsService.findAllExperts()
		return res.json(experts)
	}

	@Get(':id')
	async getExpertById(@Param('id') id: string, @Res() res: Response) {
		const expert = await this.expertsService.findExpert(id)

		if (!expert) {
			throw new NotFoundException('O profissional não existe')
		}

		return res.json(expert)
	}

	@Patch(':id')
	async updateExpert(
		@Param('id') id: string,
		@Body() data: updateExpertsDto,
		@Res() res: Response
	) {
		const expert = await this.expertsService.findExpert(id)

		if (!expert) {
			throw new NotFoundException('O profissional não existe')
		}

		const emailExist = await this.expertsService.findExpertByEmail(data.email)

		if (data.email) {
			if (emailExist && emailExist.email !== expert.email) {
				throw new BadRequestException(
					'Já existe um profissional com o email informado'
				)
			}
		}

		await this.expertsService.updateExpert(id, { ...expert, ...data })
		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
