import { Module } from '@nestjs/common'
import { QueuecustumerService } from './queuecustumer.service'
import { QueuecustumerController } from './queuecustumer.controller'

@Module({
	controllers: [QueuecustumerController],
	providers: [QueuecustumerService]
})
export class QueuecustumerModule {}
