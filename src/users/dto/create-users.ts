import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export default class CreateUsersDto {
	@ApiProperty({
		description: 'Para criar um usuario é obrigatório informar um nome',
		example: 'Pedro Fernandes'
	})
	@IsNotEmpty({ message: 'O campo nome é obrigatório' })
	name: string

	@IsNotEmpty({ message: 'O campo email é obrigatório' })
	@ApiProperty({
		description:
			'Para criar um usuario é obrigatório informar o email, que será utilizado para login',
		example: 'pedro@email.com'
	})
	@IsEmail({}, { message: 'O campo precisa ter um formato de e-mail válido' })
	email: string

	@ApiProperty({
		description: 'Para criar um usuario é obrigatório informar uma senha',
		example: 'pedro1234'
	})
	@IsNotEmpty({ message: 'O campo password é obrigatório' })
	password: string
}
