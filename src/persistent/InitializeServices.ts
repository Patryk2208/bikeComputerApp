import database from './database/Database.ts';
import { useRideStore } from './stores/useRideStore';
import { useSettingsStore } from './stores/useSettingsStore';
import {Step, SagaWorkflow} from "../utils/sagaUtils.ts";

export async function InitializeServices() {
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
    );
}