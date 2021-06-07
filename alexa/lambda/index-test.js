const VirtualAlexa = require("virtual-alexa").VirtualAlexa

describe("test skill", () => {
    let alexa;
    beforeEach(() => {
        alexa = new VirtualAlexa.Builder()
            .handler("../lambda/index.js")
            .interactionModelFile("../skill-package/interactionModels/custom/en-US.json")
            .create();
            
    });

    test("Basic dialog", async (done) => {
        let response = await alexa.launch();
        expect(response.prompt()).toContain("Welcome, do you want to order food or reserve a table?");
        response = await alexa.request()
            .intent("ReserveIntent")
            .slot("Date", "2021-05-31")
            .set(context.System.user.permissions.consentToken)
            .send();
        
        let request = await alexa.request()
            .intent("ReserveIntent")
            .slot("Time", "10:00");
        
        response = await request.send();
        expect(request.json().request.dialogState).toBe("IN_PROGRESS");
        
        response = await alexa.request().intent("ReserveIntent")
            .slot("assistants", "4")
            .dialogState("COMPLETED")
            .send();
        expect(response.prompt()).toContain("Reserved Table for ...");
        
        done();
    });})