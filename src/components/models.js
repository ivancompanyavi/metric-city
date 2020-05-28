class Parser {
  constructor(json) {
    this.children = json.children || []
    this.type = json.type
  }
  parse() {
    const component = `<metric-${
      this.type
    } ${this.getAttributes()}>${this.getChildren()}</metric-${this.type}>`
    return component
  }

  getAttributes() {
    let result = ''
    for (let [key, value] of Object.entries(this.data)) {
      result += `data-${key}="${value}" `
    }
    return result
  }

  getChildren() {
    let result = ''
    for (let child of this.children) {
      result += ParserFactory.getInstance(child).parse()
    }
    return result
  }
}

class CityParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      width: json.width || 0,
      height: json.height || 0,
      rows: json.rows || 0,
      columns: json.rows || 0,
    }
  }
}

class LayerParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
    }
  }
}
class TileMapParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
      color: json.color || '',
    }
  }
}
class HouseParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
      pct: json.pct || 0.0,
    }
  }
}
class TextParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
      text: json.text || '',
    }
  }
}
class RoadParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
      length: json.length || 0,
      direction: json.direction || '',
    }
  }
}
class FireStationParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
    }
  }
}
class HospitalParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
    }
  }
}
class ParkParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
    }
  }
}
class StackedHouseParser extends Parser {
  constructor(json) {
    super(json)
    this.data = {
      id: json.id || '',
      x: json.x || 0,
      y: json.y || 0,
      pct: json.pct || 0.0,
    }
  }
}

class ParserFactory {
  static getInstance(json) {
    switch (json.type) {
      case 'city':
        return new CityParser(json)
      case 'layer':
        return new LayerParser(json)
      case 'tile-map':
        return new TileMapParser(json)
      case 'house':
        return new HouseParser(json)
      case 'text':
        return new TextParser(json)
      case 'road':
        return new RoadParser(json)
      case 'fire-station':
        return new FireStationParser(json)
      case 'hospital':
        return new HospitalParser(json)
      case 'park':
        return new ParkParser(json)
      case 'stacked-house':
        return new StackedHouseParser(json)
    }
  }
}
export function cityParser(json) {
  const componentString = ParserFactory.getInstance(json).parse()
  console.log(componentString)
  return new DOMParser().parseFromString(componentString, 'text/html').body
    .firstChild
}
