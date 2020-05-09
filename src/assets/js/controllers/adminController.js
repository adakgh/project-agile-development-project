class AdminController {

    constructor() {
        this.userRepository = new UserRepository();
        this.forumRepository = new ForumRepository();
        // this.eventRepository = new activiteitenRepository();

        $.get("views/admin.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.adminView = $(htmlData);

        this.loadCardInfo();
        this.loadUsers();
        this.loadForums();

        $(".content").empty().append(this.adminView);
    }

    async loadCardInfo() {
        const userData = await this.userRepository.getAll();
        const userAlert = $(".users");

        for (let i = 0; i < 1; i++) {
            let infoUser = `<div class="h2">${userData.length}</div>`;


            userAlert.prepend(infoUser);
        }

        const forumData = await this.forumRepository.getAll();
        const forumAlert = $(".forum");

        for (let i = 0; i < 1; i++) {
            let infoForum = `<div class="h2">${forumData.length}</div>`;


            forumAlert.prepend(infoForum);
        }

        //TODO: getAll in activiteiten repoistory en app.js aanmaken

        // const eventData = await this.eventRepository.getAll();
        // const eventAlert = $(".event");
        //
        // for (let i = 0; i < 1; i++) {
        //     let infoEvent = `<div class="h2">${eventData.length}</div>`;
        //
        //
        //     eventAlert.prepend(infoEvent);
        // }

    }

    async loadUsers() {
        const userData = await this.userRepository.getAll();
        const userTable = $("#userTable");

        for (let i = 0; i < userData.length; i++) {
            let nextUser = "<tr>";
            nextUser += `<td>${userData[i].username}</td>`;
            nextUser += `<td>${userData[i].naam}</td>`;
            nextUser += `<td>${userData[i].email}</td>`;
            nextUser += `<td>${userData[i].geslacht}</td>`;
            nextUser += `<td>${userData[i].leeftijd}</td>`;
            nextUser += `<td>${userData[i].bio}</td>`;

            nextUser += `<td><i class="fa fa-trash"></i></td>`;

            userTable.append(nextUser);
        }
    }

    async loadForums() {
        const forumData = await this.forumRepository.getAll();
        const forumTable = $("#forumTable");

        for (let i = 0; i < forumData.length; i++) {
            let nextForum = "<tr>";
            nextForum += `<td>${forumData[i].title}</td>`;
            nextForum += `<td>${forumData[i].username}</td>`;
            nextForum += `<td>${forumData[i].tag}</td>`;

            nextForum += `<td><i class="fa fa-trash"></i></td>`;

            forumTable.append(nextForum);
        }
    }

    error() {
        $(".content").html("Failed to load content")
    }
}