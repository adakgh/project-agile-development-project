class AdminController {

    constructor() {
        this.userRepository = new UserRepository();
        this.forumRepository = new ForumRepository();
        this.eventRepository = new activiteitenRepository();

        $.get("views/admin.html")
            .done((htmlData) => this.setup(htmlData))
            .fail(() => this.error());
    }

    setup(htmlData) {
        this.adminView = $(htmlData);

        this.loadCardInfo();
        this.loadUsers();
        this.loadForums();
        this.loadEvents();

        $(".content").empty().append(this.adminView);
    }

    //Aantal van elke tabel weergeven
    async loadCardInfo() {
        const userData = await this.userRepository.getAll();
        const userAlert = $(".users");

        for (let i = 0; i < 1; i++) {
            let infoUser = `<div class="h2">${userData.length}</div>`;


            userAlert.prepend(infoUser);
        }

        const forumData = await this.forumRepository.getAll();
        const forumAlert = $(".forumalert");

        for (let i = 0; i < 1; i++) {
            let infoForum = `<div class="h2">${forumData.length}</div>`;


            forumAlert.prepend(infoForum);
        }

        const eventData = await this.eventRepository.getAll();
        const eventAlert = $(".event");

        for (let i = 0; i < 1; i++) {
            let infoEvent = `<div class="h2">${eventData.length}</div>`;

            eventAlert.prepend(infoEvent);
        }

        //TODO: reports in database zetten


    }

    //Gebruikers laden
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

            nextUser += `<td><button type="button" class="btn btn-danger userDelete" data-userid = "${userData[i].id}">Verwijderen</button></td>`;

            $('.userDelete').on("click", (event) => {
                console.log(event.currentTarget.dataset.userid);
                const userid = event.currentTarget.dataset.userid;
                // this.userdelete(userid);
            });

            userTable.append(nextUser);
        }
    }

    //Forum laden
    async loadForums() {
        const forumData = await this.forumRepository.getAll();
        const forumTable = $("#forumTable");

        for (let i = 0; i < forumData.length; i++) {
            let nextForum = "<tr>";
            nextForum += `<td>${forumData[i].title}</td>`;
            nextForum += `<td>${forumData[i].username}</td>`;
            nextForum += `<td>${forumData[i].tag}</td>`;

            nextForum += `<td><button type="button" class="btn btn-danger forumDelete" data-forumid = "${forumData[i].id}">Verwijderen</button></td>`;

            $('.forumDelete').on("click", (event) => {
                console.log(event.currentTarget.dataset.forumid);
                const forumid = event.currentTarget.dataset.forumid;
                // this.forumdelete(forumid);
            });

            forumTable.append(nextForum);
        }
    }

    //Activiteiten laden
    async loadEvents() {
        const eventData = await this.eventRepository.getAll();
        const eventTable = $("#eventTable");

        for (let i = 0; i < eventData.length; i++) {
            let nextEvent = "<tr>";
            nextEvent += `<td>${eventData[i].name}</td>`;
            nextEvent += `<td>${eventData[i].status}</td>`;
            nextEvent += `<td>${eventData[i].date.slice(0, -14)}</td>`;
            nextEvent += `<td>${eventData[i].begin_time}</td>`;
            nextEvent += `<td>${eventData[i].end_time}</td>`;
            nextEvent += `<td>${eventData[i].place}</td>`;

            nextEvent += `<td><button type="button" class="btn btn-danger eventDelete" data-eventid = "${eventData[i].id}">Verwijderen</button></td>`;

            $('.eventDelete').on("click", (event) => {
                console.log(event.currentTarget.dataset.eventid);
                const eventid = event.currentTarget.dataset.eventid;
                // this.eventdelete(eventid);
            });

            eventTable.append(nextEvent);
        }
    }

    //Gebruiker verwijderen
    // async userdelete(id) {
    //     try {
    //         const userDelete = await this.userRepository.delete(id);
    //         console.log(userDelete);
    //
    //         if (confirm("Weet u zeker dat u deze gebruiker wilt verwijderen?")) {
    //             alert("Deze gebruiker is verwijderd!");
    //             new WelcomeController();
    //         } else {
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    //Forum verwijderen
    // async forumdelete(id) {
    //     try {
    //         const forumDelete = await this.forumRepository.delete(id);
    //         console.log(forumDelete);
    //
    //         if (confirm("Weet u zeker dat u deze artikel wilt verwijderen?")) {
    //             alert("Dit artikel is verwijderd!");
    //             new WelcomeController();
    //         } else {
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    //Activiteit verwijderen
    // async eventdelete(id) {
    //     try {
    //         const eventDelete = await this.eventRepository.delete(id);
    //         console.log(eventDelete);
    //
    //         if (confirm("Weet u zeker dat u deze activiteit wilt verwijderen?")) {
    //             alert("Deze activiteit is verwijderd!");
    //             new WelcomeController();
    //         } else {
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }


    error() {
        $(".content").html("Failed to load content")
    }
}