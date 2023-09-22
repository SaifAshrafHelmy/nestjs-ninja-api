import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  // Ninjas API
  /* 
  GET /ninjas => [{ ... }, { ... }]
  GET /ninjas/:id => { ... }
  POST /ninjas/ 
  PUT /ninjas/:id => { ... }
  DELETE /ninjas/:id
   */
  constructor(private readonly ninjasService: NinjasService) {}

  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (err) {
      console.dir(err);
      throw new NotFoundException('ninja not found bro');
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id);
  }
}
