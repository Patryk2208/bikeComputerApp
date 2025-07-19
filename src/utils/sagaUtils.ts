export class SagaWorkflow {
    private jobs: Step[] = [];
    private currentJobIndex: number = 0;
    public AddJobs(steps: Step[]) {
        for (const step of steps) {
            this.jobs.push(step);
        }
    }
    public async Run(): Promise<boolean> {
        let error = false;
        try {
            for (const step of this.jobs) {
                await step.doFunction();
                ++this.currentJobIndex;
            }
        }
        catch (err) {
            error = true;
        }
        if (error && this.currentJobIndex > 0) {
            try {
                for (let i = this.currentJobIndex - 1; i >= 0; --i) {
                    await this.jobs[i].undoFunction();
                }
            }
            catch (err) {
                console.log("Error while undoing steps: ", err);
                return false;
            }
        }
        return true;
    }

}


export class Step {
    public doFunction: () => any;
    public undoFunction: () => any;
    constructor(doF: () => any, undoF: () => any) {
        this.doFunction = doF;
        this.undoFunction = undoF;
    }
}