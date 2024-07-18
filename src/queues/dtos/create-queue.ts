import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export default class CreateQueueDto {
	@ApiProperty({
		description:
			'Para criar uma fila é nescesário passar o id de um expert(profissional)',
		example: '07c8a185-6e3e-4a5f-9c6b-85de83221bd7'
	})
	@IsNotEmpty({
		message: 'O campo expertId é obrigatório'
	})
	expertId: string
}
