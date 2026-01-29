import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { TradeOrdersService } from './trade-orders.service';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('trade-orders')
@Controller('trade_orders')
export class TradeOrdersController {
    constructor(private readonly tradeOrdersService: TradeOrdersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new trade order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() createTradeOrderDto: CreateTradeOrderDto) {
        return this.tradeOrdersService.create(createTradeOrderDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all trade orders' })
    @ApiResponse({ status: 200, description: 'Return all trade orders.' })
    findAll() {
        return this.tradeOrdersService.findAll();
    }
}
