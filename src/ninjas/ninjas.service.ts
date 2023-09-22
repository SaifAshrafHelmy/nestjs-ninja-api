import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'ninjaA', weapon: 'stars' },
    { id: 1, name: 'ninjaB', weapon: 'nunchucks' },
    { id: 2, name: 'ninjaC', weapon: 'nunchucks' },
  ];

  getNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('ninja not found');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    // push returns the new length of the array
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        ninja = {
          ...ninja,
          ...updateNinjaDto,
        };
      }
      return ninja;
    });
    return this.getNinja(id);
  }

  removeNinja(id: number) {
    const indexOfNinja = this.ninjas.findIndex((ninja) => ninja.id === id);

    if (indexOfNinja >= 0) {
      const deletedNinja = this.ninjas.splice(indexOfNinja, 1);
      return { deletedNinja };
    } else {
      throw new Error('ninja not found');
    }
  }
}
