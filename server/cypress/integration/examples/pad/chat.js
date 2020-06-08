//Context: Chat
describe("chat", function () {
    //Run before each test in this context
    beforeEach(() => {
        //Go to the specified URL
        cy.visit("http://localhost:8080#chat");
    });

    //Test: Validate chat
    it("Valid chat", function() {
        //Find the field for the username, check if it exists.
        cy.get("#usernameInput").should("exist");

        //Find the field for the text, check if it exists.
        cy.get("#text").should("exist");

    });

    //Test: Successful chat
    it("Successful chat", function () {

        //Start a fake server
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested

        //Find the field for the nickname and and type the text "test", and access to the chat.
        cy.get("#usernameInput").type("test"+ "{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("Goodafternoon everybody!" +"{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("Im new here"+ "{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("Good to see you"+ "{enter}");

        //After a successful chat, the URL should now contain #chat.
        cy.url().should("contain", "#chat");
    });


    //Test: Failed chat
    it("Failed chat", function () {
        //Start a fake server
        cy.server();

        //Add a stub with the URL /user as a POST
        //Respond with a JSON-object when requested and set the status-code tot 401.
        //Give the stub the alias: @chat
        cy.route({
            method: "POST",
            url: "/user/chat",
            response: {
                reason: "ERROR"
            },
            status: 401
        }).as("chat");

        //Find the field for the nickname and and type the text "test", and access to the chat.
        cy.get("#usernameInput").type("test" +
            '{enter}');

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("Goodafternoon everybody!" + "{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("I'm new here" + "{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("This is a cypress test" + "{enter}");;

        //enter to sent message
        cy.get("#text").type("{enter}");

        //Wait for the @register-stub to be called by the click-event.
        cy.wait("@chat");

        //After a failed register, an element containing our error-message should be shown.
        cy.get(".error").should("exist").should("contain", "ERROR");
    });
});