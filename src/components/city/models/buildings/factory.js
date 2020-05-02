import FireStation from './firestation'
import Hospital from './hospital'
import House from './house'
import Park from './park'
import Police from './police'
import { Road } from '../misc'

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
