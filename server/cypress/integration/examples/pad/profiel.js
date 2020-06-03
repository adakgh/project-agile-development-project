//context: profiel
describe ("Profiel", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080#profiel");
    });

    //Test: profile edit
    it("Valid profile edit form", function () {
    //Find the field for the username, check if it exists.
    cy.get("#username").should("exist");

    //Find the field for the full name, check if it exists.
    cy.get("#naam").should("exist");

    //Find the field for the email, check if it exists.
    cy.get("#email").should("exist");

    //Find the field for the city, check if it exists.
    cy.get("#stad").should("exist");

    //Find the field for the phone number , check if it exists.
    cy.get("#telefoonnr").should("exist");

    //Find the field for the age, check if it exists.
    cy.get("#leeftijd").should("exist");

    //Find the field for the gender, check if it exists.
    cy.get("#geslachtOpties").should("exist");
    });

    //Test: Successful profile edit
    it("Successful profile edit", function () {
        //Start a fake server
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested

        //click event
        cy.get(".button").click();

        //Give the stub the alias: @profiel
        cy.route("POST", "/user/profiel").as("profiel");

        //Find the field for the username and and type the text "Jann".
        cy.get("#username").type("Jann");

        //Find the field for the naam and and type the text "Jan Pieter".
        cy.get("#naam").type("Jan Pieter");

        //Find the field for the email and and type the text "jan@live.nl".
        cy.get("#email").type("jan@live.nl");

        //Find the field for the city and and type the text "Amsterdam".
        cy.get("#stad").type("Amsterdam");

        //Find the field for the phone number and type the text "0612345678".
        cy.get("#telefoonnr").type("0612345678");

        //Find the field for the leeftijd  and type the text "40".
        cy.get("#leeftijd").type("40");

        //Find the field for the geslachtOpties  and type the text "Man".
        cy.get("#geslachtOpties").select("Man");

        //Find the button to register and click it.
        cy.get(".btn-primary").click();

        //Wait for the @register-stub to be called by the click-event.
        // cy.wait("@profiel");

        //The @profiel-stub is called, check the contents of the incoming request.
        cy.get("@profiel").log((xhr) => {

            //The username should match what we typed earlier
            expect(xhr.request.body.username).equals("Jann");

            //The full name should match what we typed earlier
            expect(xhr.request.body.naam).equals("Jan Pieter");

            //The email should match what we typed earlier
            expect(xhr.request.body.email).equals("jan@live.nl");

            //The city should match what we typed earlier
            expect(xhr.request.body.stad).equals("Amsterdam");

            //The phone number should match what we selected earlier
            expect(xhr.request.body.telefoon_nummer).eql("0612345678");

            //The age should match what we checked earlier
            expect(xhr.request.body.leeftijd).eql("40");

            //The gender should match what we selected earlier
            expect(xhr.request.body.geslacht).equals("Man");

            cy.get(".btn-primary").click();



        });

        //After a successful register, the URL should now contain #welcome.
        cy.url().should("contain", "#profiel");
    });

    //Test: Failed profile edit
    // it("Failed profile edit", function () {
    //     //Start a fake server
    //     cy.server();
    //
    //     //Add a stub with the URL /user as a POST
    //     //Respond with a JSON-object when requested and set the status-code tot 401.
    //     //Give the stub the alias: @register
    //     cy.route({
    //         method: "POST",
    //         url: "/user/profiel",
    //         response: {
    //             reason: "ERROR"
    //         },
    //         status: 401
    //     }).as("profiel");
    //
    //     //Find the field for the username and and type the text "Jann".
    //     cy.get("#username").type("Jann");
    //
    //     //Find the field for the naam and and type the text "Jan Pieter".
    //     cy.get("#naam").type("Jan Pieter");
    //
    //     //Find the field for the email and and type the text "jan@live.nl".
    //     cy.get("#email").type("jan@live.nl");
    //
    //     //Find the field for the city and and type the text "Amsterdam".
    //     cy.get("#stad").type("Amsterdam");
    //
    //     //Find the field for the phone number and type the text "0612345678".
    //     cy.get("#telefoonnr").type("0612345678");
    //
    //     //Find the field for the leeftijd  and type the text "40".
    //     cy.get("#leeftijd").type("40");
    //
    //     //Find the field for the geslachtOpties  and type the text "Man".
    //     cy.get("#geslachtOpties").select("Man");
    //
    //     //Find the button to save changes and click it.
    //     cy.get(".btn-primary").click();
    //
    //     //Wait for the @profiel-stub to be called by the click-event.
    //     cy.wait("@profiel");
    //
    //     //After a failed register, an element containing our error-message should be shown.
    //     cy.get(".error").should("exist").should("contain", "ERROR");


})
