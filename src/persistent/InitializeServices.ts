import database from './database/Database.ts';
import { useRideStore } from './stores/useRideStore';
import { useSettingsStore } from './stores/useSettingsStore';
import {Step, SagaWorkflow} from "../utils/sagaUtils.ts";

export class ServicesManager {
    private workflow: SagaWorkflow;
    constructor() {
        let initializationSteps: Step[] = [
            new Step(
                async () => {
                    await database.Initialize();
                },
                async () => {
                    await database.Close();
                }
            ),
            new Step(
                async () => {
                    await useSettingsStore.getState().LoadSettings();
                },
                () => {}
            ),
            new Step(
                async () => {
                    await useRideStore.getState().LoadAllRides();
                },
                () => {}
            ),
        ]
        this.workflow = new SagaWorkflow();
        this.workflow.AddJobs(initializationSteps);
    }

    public async Start() {
        await this.workflow.Run().then(
            (success) => {
                if (success) {
                    console.log("Initialization successful");
                }
                else {
                    console.log("Initialization failed");
                    throw new Error("Initialization failed");
                }
            }
        );
    }

    public async Stop() {
        await this.workflow.Cleanup().then(
            (success) => {
                if (success) {
                    console.log("Cleanup successful");
                }
                else {
                    console.log("Cleanup failed");
                    throw new Error("Cleanup failed");
                }
            }
        );
    }
}

const Services = new ServicesManager();
export default Services;