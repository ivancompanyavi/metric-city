import FireStation from './firestation.js'
import Hospital from './hospital.js'
import House from './house.js'
import Park from './park.js'
import Police from './police.js'
import { Road } from '../misc/index.js'

export default class buildingFactory {
  static getInstance(name) {
    switch (name.toLowerCase()) {
      case 'house':
        return House
      case 'hospital':
        return Hospital
      case 'firedep':
        return FireStation
      case 'police':
        return Police
      case 'park':
        return Park
      case 'road':
        return Road
      default:
        return House
    }
  }
}
