import database from './database/Database.ts';
import { useRideStore } from './stores/useRideStore';
import { useSettingsStore } from './stores/useSettingsStore';
import {Step, SagaWorkflow} from "../utils/sagaUtils.ts";

export async function InitializeServices() {

    let initializationSteps: Step[] = [
        new Step(database.Initialize, database.Close),
        new Step(useSettingsStore.getState().LoadSettings, () => {}),
        new Step(useRideStore.getState().LoadAllRides, () => {}),
    ]
    let workflow = new SagaWorkflow();
    workflow.AddJobs(initializationSteps);
    await workflow.Run().then(
        (success) => {
            if (success) {
                console.log("Initialization successful");
            }
            else {
                console.log("Initialization failed");
                throw new Error("Initialization failed");
            }
        }
    )
}