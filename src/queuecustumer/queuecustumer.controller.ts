import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	Res,
	UseGuards
} from '@nestjs/common'
import { QueuecustumerService } from './queuecustumer.service'
import CreateQueuecustumerDto from './dtos/create-queuecustumer'
import { Response } from 'express'
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('queuecustumer')
@Controller('queuecustumer')
export class QueuecustumerController {
	constructor(private readonly queuecustumerService: QueuecustumerService) {}

	@Post()
	async addCustumer(
		@Body() data: CreateQueuecustumerDto,
		@Res() res: Response
	) {
		const queueExists = await this.queuecustumerService.getExpertQueueToday(
			data.expertId
		)

		if (!queueExists) {
			throw new NotFoundException('A fila não existe')
		}

		const custumer = await this.queuecustumerService.addCustumer({
			name: data.name,
			service: data.service,
			queueId: queueExists.id
		})

		return res.status(HttpStatus.CREATED).json(custumer)
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async atendCustumer(@Param('id') id: string, @Res() res: Response) {
		const custumer = await this.queuecustumerService.findCustumer(+id)

		if (!custumer) {
			throw new NotFoundException('O cliente não existe')
		}

		await this.queuecustumerService.atendCustumer(custumer.id)

		return res.status(HttpStatus.NO_CONTENT).send()
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteCustumer(@Param('id') id: string, @Res() res: Response) {
		const custumer = await this.queuecustumerService.findCustumer(+id)

		if (!custumer) {
			throw new NotFoundException('O cliente não existe')
		}

		await this.queuecustumerService.deleteCustumer(custumer.id)

		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
