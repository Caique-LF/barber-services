import {
	Body,
	Controller,
	HttpStatus,
	NotFoundException,
	Post,
	Res
} from '@nestjs/common'
import { QueuecustumerService } from './queuecustumer.service'
import CreateQueuecustumerDto from './dtos/create-queuecustumer'
import { Response } from 'express'

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
}
