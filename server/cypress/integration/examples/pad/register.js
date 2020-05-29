//Context: Register
describe("Register", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080#register");
    });

    //Test: Validate register form
    it("Valid register form", function () {
        //Find the field for the username, check if it exists.
        cy.get("#exampleUserName").should("exist");

        //Find the field for the full name, check if it exists.
        cy.get("#exampleFullName").should("exist");

        //Find the field for the email, check if it exists.
        cy.get("#exampleInputEmail").should("exist");

        //Find the field for the password, check if it exists.
        cy.get("#exampleInputPassword").should("exist");

        //Find the field for the password validation, check if it exists.
        cy.get("#exampleRepeatPassword").should("exist");

        //Find the field for the gender, check if it exists.
        cy.get("#exampleGender").should("exist");

        //Find the field for the age, check if it exists.
        cy.get("#exampleAge").should("exist");

        //Find the field for the newsletter, check if it exists.
        cy.get("#defaultRegisterFormNewsletter").should("exist");

        //Find the button to register, check if it exists.
        cy.get(".btn").should("exist");
    });

    //Test: Successful register
    it("Successful registered", function () {
        //Start a fake server
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested
        //Give the stub the alias: @register
        cy.route("POST", "/user/register").as("register");

        //Find the field for the username and type the text "Hans1".
        cy.get("#exampleUserName").type("Hans1");

        //Find the field for the full name and type the text "Hans de Groot".
        cy.get("#exampleFullName").type("Hans de Groot");

        //Find the field for the email and type the text "hans123@live.nl".
        cy.get("#exampleInputEmail").type("hans123@live.nl");

        //Find the field for the password and and type the text "Hans123".
        cy.get("#exampleInputPassword").type("Hans123");

        //Find the field for the password validation and type the text "Hans123".
        cy.get("#exampleRepeatPassword").type("Hans123");

        //Find the field for the gender and select "Man".
        cy.get("#exampleGender").select("Man");

        //Find the field for the age and select "60".
        cy.get("#exampleAge").select('60');

        //Find the field for the newsletter and check it.
        cy.get("#defaultRegisterFormNewsletter").check({force: true});

        //Find the button to register and click it.
        cy.get(".btn").click();

        //Wait for the @register-stub to be called by the click-event.
        cy.wait("@register");

        //The @register-stub is called, check the contents of the incoming request.
        cy.get("@register").should((xhr) => {
            //The username should match what we typed earlier
            expect(xhr.request.body.username).equals("Hans1");

            //The full name should match what we typed earlier
            expect(xhr.request.body.naam).equals("Hans de Groot");

            //The email should match what we typed earlier
            expect(xhr.request.body.email).equals("hans123@live.nl");

            //The password should match what we typed earlier
            expect(xhr.request.body.password).equals("Hans123");

            //The gender should match what we selected earlier
            expect(xhr.request.body.geslacht).equals("Man");

            //The age should match what we selected earlier
            expect(xhr.request.body.leeftijd).eql(["60"]);

            //The newsletter should match what we checked earlier
            expect(xhr.request.body.newsletter).equals("1");
        });

        //After a successful register, the URL should now contain #welcome.
        cy.url().should("contain", "#welcome");
    });

    //TODO
    //Test: Failed register
    it("Failed register", function () {
        //Start a fake server
        cy.server();

        //Add a stub with the URL /user as a POST
        //Respond with a JSON-object when requested and set the status-code tot 401.
        //Give the stub the alias: @register
        cy.route({
            method: "POST",
            url: "/user/register",
            response: {
                reason: "ERROR"
            },
            status: 400
        }).as("register");

        //Find the field for the username and type the text "Hans1".
        cy.get("#exampleUserName").type("Hans1");

        //Find the field for the full name and type the text "Hans de Groot".
        cy.get("#exampleFullName").type("Hans de Groot");

        //Find the button to register and click it.
        cy.get(".btn").click();

        //Wait for the @register-stub to be called by the click-event.
        cy.wait("@register");

        //After a failed register, an element containing our error-message should be shown.
        cy.get(".error").should("exist").should("contain", "ERROR");
    });
});