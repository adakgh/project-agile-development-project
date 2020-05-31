//Context: Admin
describe("Admin", function () {

    //Test: Successful login as Admin
    it("Successful login as Admin", function () {
        cy.visit("http://localhost:8080#login");

        //Start a fake server
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested
        //Give the stub the alias: @login
        cy.route("POST", "/user/login", {"username": "test"}).as("login");

        //Find the field for the username and type the text "test".
        cy.get("#exampleInputUsername").type("test");

        //Find the field for the password and type the text "test".
        cy.get("#exampleInputPassword").type("test");

        //Find the button to login and click it.
        cy.get(".login-form button").click();

        //Wait for the @login-stub to be called by the click-event.
        cy.wait("@login");

        //The @login-stub is called, check the contents of the incoming request.
        cy.get("@login").should((xhr) => {
            //The username should match what we typed earlier
            expect(xhr.request.body.username).equals("test");

            //The password should match what we typed earlier
            expect(xhr.request.body.password).equals("test");
        });

        //After a successful login, the URL should now contain #welcome.
        cy.url().should("contain", "#welcome");
    });

    //Test: Validate Admin page
    it("Valid Admin page", function () {

        //Test: Successful login as Admin
        it("Successful login as Admin", function () {
            cy.visit("http://localhost:8080#login");

            //Start a fake server
            cy.server();

            //Add a stub with the URL /user/login as a POST
            //Respond with a JSON-object when requested
            //Give the stub the alias: @login
            cy.route("POST", "/user/login", {"username": "test"}).as("login");

            //Find the field for the username and type the text "test".
            cy.get("#exampleInputUsername").type("test");

            //Find the field for the password and type the text "test".
            cy.get("#exampleInputPassword").type("test");

            //Find the button to login and click it.
            cy.get(".login-form button").click();

            //Wait for the @login-stub to be called by the click-event.
            cy.wait("@login");

            //The @login-stub is called, check the contents of the incoming request.
            cy.get("@login").should((xhr) => {
                //The username should match what we typed earlier
                expect(xhr.request.body.username).equals("test");

                //The password should match what we typed earlier
                expect(xhr.request.body.password).equals("test");
            });

            //After a successful login, the URL should now contain #welcome.
            cy.url().should("contain", "#welcome");
        });

        //Find the card for the new users, check if it exists.
        cy.get(".usercard").should("exist");

        //Find the card for the new topics, check if it exists.
        cy.get(".forumcard").should("exist");

        //Find the card for the new events, check if it exists.
        cy.get(".eventcard").should("exist");

        //Find the card for the new reports, check if it exists.
        cy.get(".reportcard").should("exist");

        //Find the table for the users, check if it exists.
        cy.get("#userTable").should("exist");

        //Find the table for the topics, check if it exists.
        cy.get("#forumTable").should("exist");

        //Find the table for the events, check if it exists.
        cy.get("#eventTable").should("exist");

    });

    //Test: Failed login as Admin
    it("Failed login as Admin", function () {
        cy.visit("http://localhost:8080#login");

        //Start a fake server
        cy.server();

        //Add a stub with the URL /user as a POST
        //Respond with a JSON-object when requested and set the status-code tot 401.
        //Give the stub the alias: @register
        cy.route({
            method: "POST",
            url: "/user/login",
            response: {
                reason: "ERROR"
            },
            status: 401
        }).as("login");

        //Find the field for the username and type the text "test".
        cy.get("#exampleInputUsername").type("test");

        //Find the field for the password and type the text "test".
        cy.get("#exampleInputPassword").type("test");

        //Find the button to login and click it.
        cy.get(".btn").click();

        //Wait for the @register-stub to be called by the click-event.
        cy.wait("@login");

        //After a failed register, an element containing our error-message should be shown.
        cy.get(".error").should("exist").should("contain", "ERROR");
    });
});