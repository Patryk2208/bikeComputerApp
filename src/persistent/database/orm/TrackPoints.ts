export class TrackPoint {
    public TrackPointId : number = -1;
    Timestamp : Date;
    constructor(
                public RideId : number,
                public Latitude : number,
                public Longitude : number,
                timestamp : number,
                public TrackPointDetails : TrackPointDetails) {
        this.Timestamp = new Date(timestamp);
    }

}

export class TrackPointDetails {
    public TrackPointId : number = -1;
    constructor(
        public Altitude : number | null,
        public Speed : number | null,
        public Accuracy : number) {}
}