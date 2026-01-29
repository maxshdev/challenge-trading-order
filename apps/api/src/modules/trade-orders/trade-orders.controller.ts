import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TradeOrdersService } from './trade-orders.service';
import { CreateTradeOrderDto } from './dto/create-trade-order.dto';
import { UpdateTradeOrderDto } from './dto/update-trade-order.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

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
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Return all trade orders.' })
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.tradeOrdersService.findAll(Number(page), Number(limit));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a trade order by ID' })
    @ApiResponse({ status: 200, description: 'Return the trade order.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    findOne(@Param('id') id: string) {
        return this.tradeOrdersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a trade order' })
    @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    @UsePipes(new ValidationPipe({ transform: true }))
    update(@Param('id') id: string, @Body() updateTradeOrderDto: UpdateTradeOrderDto) {
        return this.tradeOrdersService.update(id, updateTradeOrderDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a trade order' })
    @ApiResponse({ status: 200, description: 'The order has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Not Found.' })
    async remove(@Param('id') id: string) {
        await this.tradeOrdersService.remove(id);
        return { success: true };
    }
}
