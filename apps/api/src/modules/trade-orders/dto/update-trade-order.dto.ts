import { PartialType } from '@nestjs/swagger';
import { CreateTradeOrderDto } from './create-trade-order.dto';

export class UpdateTradeOrderDto extends PartialType(CreateTradeOrderDto) { }
