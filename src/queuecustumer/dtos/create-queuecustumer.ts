import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class CreateQueuecustumerDto {
	@ApiProperty({
		description: 'Aqui será nescessário o nome do cliente',
		example: 'Maria silva'
	})
	@IsNotEmpty({ message: 'O campo name é obrigatório' })
	name: string

	@ApiProperty({
		description: 'Aqui será nescessário o serviço que deseja.',
		example: 'Escova e corte'
	})
	@IsNotEmpty({ message: 'O campo service é obrigatório' })
	service: string

	@ApiProperty({
		description: ' Aqui será nescessario id de um expert',
		example: '07c8a185-6e3e-4a5f-9c6b-85de83221bd7'
	})
	@IsNotEmpty({ message: 'O campo expertId é obrigatório' })
	expertId: string
}
