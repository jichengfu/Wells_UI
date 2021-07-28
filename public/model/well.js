export class Well {
	constructor(data) {
		this.long = data.long;
		this.lat = data.lat;
	}

	serialize() {
		return {
			long: this.long,
			lat: this.lat
		};
	}
}