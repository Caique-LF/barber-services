import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/databese/prisma.service'

type CreateCustumer = {
	name: string
	service: string
	queueId: string
}

@Injectable()
export class QueuecustumerService {
	constructor(private readonly prisma: PrismaService) {}

	async addCustumer(data: CreateCustumer) {
		return await this.prisma.queueCustumer.create({
			data
		})
	}

	async getExpertQueueToday(expertId: string) {
		return await this.prisma.queue.findFirst({
			where: {
				expertId,
				createdAt: {
					equals: new Date()
				}
			}
		})
	}

	async atendCustumer(custumerId: number) {
		await this.prisma.queueCustumer.update({
			where: {
				id: custumerId
			},
			data: {
				isAwaiting: false
			}
		})
	}

	async findCustumer(custumerId: number) {
		return await this.prisma.queueCustumer.findFirst({
			where: {
				id: custumerId
			}
		})
	}

	async deleteCustumer(custumerId: number) {
		await this.prisma.queueCustumer.delete({
			where: {
				id: custumerId
			}
		})
	}
}
