import { Module } from '@nestjs/common'
import { PrismaModule } from './databese/prisma.module'
import { ExpertsModule } from './experts/experts.module'
import { QueuesModule } from './queues/queues.module'
import { QueuecustumerModule } from './queuecustumer/queuecustumer.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		PrismaModule,
		ExpertsModule,
		QueuesModule,
		QueuecustumerModule,
		UsersModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
