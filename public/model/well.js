export class Well {
  constructor(data) {
    this.name = data.name;
    this.long = data.long;
    this.lat = data.lat;
    this.type = data.type;
    this.spud = data.spud;
    this.showing = data.showing;
    this.group = data.group;
  }

  serialize() {
    return {
      name: this.name,
      long: this.long,
      lat: this.lat,
      type: this.type,
      spud: this.spud,
      showing: this.showing,
      group: this.group,
    };
  }
}
