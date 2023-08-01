import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'ninja A', weapon: 'stars' },
    { id: 1, name: 'ninja B', weapon: 'nunchucks' },
  ];

  // * CREATE
  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...createNinjaDto,
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  // * READ
  getAllNinjas(weapon?: 'stars' | 'nunchucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinjaById(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('ninja not found');
    }

    return ninja;
  }

  //  * UPDATE
  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return { ...ninja, ...updateNinjaDto };
      }

      return ninja;
    });

    return this.getNinjaById(id);
  }

  // * DELETE
  removeNinja(id: number) {
    const toBeRemoved = this.getNinjaById(id);

    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);

    return toBeRemoved;
  }
}
