import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/databese/prisma.service'
import CreateUsersDto from './dto/create-users'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(data: CreateUsersDto) {
		const pass = await bcrypt.hash(data.password, 10)
		return await this.prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: pass
			}
		})
	}

	async findUserByEmail(email: string) {
		return await this.prisma.user.findFirst({
			where: {
				email
			}
		})
	}
}