//Context: Chat
describe("chat", function () {

    //Test: Successful log in as user
    it("Successful login as user", function () {
        cy.visit("http://localhost:8080#chat");

        //Start a fake server
        cy.server();

        //Add a stub with the URL /user/login as a POST
        //Respond with a JSON-object when requested

        //Find the field for the nickname and and type the text "test", and access to the chat.
        cy.get("#usernameInput").type("test" +
           "{enter}");

        //Find the field for the text and and type the text "Goodafternoon everybody!".
        cy.get("#text").type("Goodafternoon everybody!" + "{enter}");

        //After a successful chat, the URL should now contain #chat.
        cy.url().should("contain", "#chat");
    });
});