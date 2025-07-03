import { TrackPoint } from './TrackPoints';
export class Ride {
    public RideId: number = -1;
    public StartTime: Date;
    public EndTime: Date | null = null;
    constructor(
                startTime : number,
                endTime : number | null,
                public TotalDistance : number,
                public AvgSpeed : number,
                public MaxSpeed : number,
                public ElevationGain : number,
                public Pauses : Pause[],
                public TrackPoints : TrackPoint[]) {
        this.StartTime = new Date(startTime);
        if(endTime !== null)
            this.EndTime = new Date(endTime);
    }
}

export class Pause {
    public PauseId : number = -1;
    StartTime : Date;
    EndTime : Date;
    constructor(
                public RideId : number,
                startTime : number,
                endTime : number) {
        this.StartTime = new Date(startTime);
        this.EndTime = new Date(endTime);
    }
}