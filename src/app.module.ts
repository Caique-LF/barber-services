import { Module } from '@nestjs/common'
import { PrismaModule } from './databese/prisma.module'

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: []
})
export class AppModule {}
