import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/databese/prisma.service'
import CreateExpertsDto from './dtos/create-experts'
import updateExpertsDto from './dtos/update-experts'

@Injectable()
export class ExpertsService {
	constructor(private readonly prisma: PrismaService) {}

	async findExpertByEmail(email: string) {
		return await this.prisma.expert.findFirst({
			where: {
				email
			}
		})
	}

	async createExpert(data: CreateExpertsDto) {
		return await this.prisma.expert.create({
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone
			}
		})
	}

	async findAllExperts() {
		return await this.prisma.expert.findMany()
	}

	async findExpert(id: string) {
		return await this.prisma.expert.findFirst({
			where: {
				id: id
			}
		})
	}

	async updateExpert(id: string, data: updateExpertsDto) {
		await this.prisma.expert.update({
			where: {
				id: id
			},
			data
		})
	}
}
