import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
	console.log('JWT_SECRET:', process.env.JWT_SECRET)
	const app = await NestFactory.create(AppModule)
	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('barber-services')
		.setDescription(
			`A barber services é uma api backend que visa a automatização do agendamento de serviços em uma barbearia, podendo o usuario criar novos perfis de profissionais(experts), filas(queues), e listar filas do dia por profissional. Esse projeto pode ser usado e implementado abertamente por qualquer pessoa que deseja obter essa automatização.`
		)
		.setVersion('1.0')
		.addTag('users')
		.addTag('experts')
		.addTag('queues')
		.addTag('quescostumer')
		.addTag('Auth')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)
	await app.listen(3000)
}
bootstrap()
