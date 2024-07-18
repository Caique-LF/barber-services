import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export default class CreateExpertsDto {
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	@ApiProperty({
		description: '',
		example: 'João Silva'
	})
	name: string

	@IsNotEmpty({ message: 'O campo email é obrigatório' })
	@IsEmail({}, { message: 'O campo precisa ter um formato de e-mail válido' })
	@ApiProperty({
		description: '',
		example: 'joao@email.com'
	})
	email: string

	@ApiProperty({
		description: '',
		example: '69999999999'
	})
	phone: string
}
