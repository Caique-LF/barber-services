import {
	Body,
	Controller,
	Delete,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
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

	@Patch(':id')
	async atendCustumer(@Param('id') id: string, @Res() res: Response) {
		const custumer = await this.queuecustumerService.findCustumer(+id)

		if (!custumer) {
			throw new NotFoundException('O cliente não existe')
		}

		await this.queuecustumerService.atendCustumer(custumer.id)

		return res.status(HttpStatus.NO_CONTENT).send()
	}

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
