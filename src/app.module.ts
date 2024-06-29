import { Module } from '@nestjs/common'
import { PrismaModule } from './databese/prisma.module'
import { ExpertsModule } from './experts/experts.module'

@Module({
	imports: [PrismaModule, ExpertsModule],
	controllers: [],
	providers: []
})
export class AppModule {}
