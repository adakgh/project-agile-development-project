class AdminController {

    constructor() {
        this.userRepository = new UserRepository();
        this.forumRepository = new ForumRepository();
        this.eventRepository = new activiteitenRepository();
        this.reportRepository = new ReportRepository();

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
        this.loadReports();

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

        const reportData = await this.reportRepository.getAll();
        const reportAlert = $(".reports");
        for (let i = 0; i < 1; i++) {
            let infoReport = `<div class="h2">${reportData.length}</div>`;

            reportAlert.prepend(infoReport);
        }

    }


    //Gebruikers laden
    async loadUsers() {
        const userData = await this.userRepository.getAll();
        const userTable = $("#userTable");

        for (let i = 0; i < userData.length; i++) {
            let nextUser = "<tr>";
            nextUser += `<td>${userData[i].id}</td>`;
            nextUser += `<td>${userData[i].username}</td>`;
            nextUser += `<td>${userData[i].naam}</td>`;
            nextUser += `<td>${userData[i].email}</td>`;
            nextUser += `<td>${userData[i].geslacht}</td>`;
            nextUser += `<td>${userData[i].leeftijd}</td>`;
            nextUser += `<td>${userData[i].bio}</td>`;

            nextUser += `<td><button type="button" class="btn btn-danger userDelete" data-userid = "${userData[i].id}">Verwijderen</button></td>`;

            userTable.append(nextUser);
        }

        //Als er op de verwijderen knop wordt gedrukt
        $('.userDelete').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.userid);
            const userid = event.currentTarget.dataset.userid;
            this.userdelete(userid);
        });
    }

    //Forum laden
    async loadForums() {
        const forumData = await this.forumRepository.getAll();
        const forumTable = $("#forumTable");

        for (let i = 0; i < forumData.length; i++) {
            let nextForum = "<tr>";
            nextForum += `<td>${forumData[i].id}</td>`;
            nextForum += `<td>${forumData[i].title}</td>`;
            nextForum += `<td>${forumData[i].username}</td>`;
            nextForum += `<td>${forumData[i].tag}</td>`;

            nextForum += `<td><button type="button" class="btn btn-danger forumDelete" data-forumid = "${forumData[i].id}">Verwijderen</button></td>`;

            forumTable.append(nextForum);
        }

        //Als er op de verwijderen knop wordt gedrukt
        $('.forumDelete').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.forumid);
            const forumid = event.currentTarget.dataset.forumid;
            this.forumdelete(forumid);
        });
    }

    //Activiteiten laden
    async loadEvents() {
        const eventData = await this.eventRepository.getAll();
        const eventTable = $("#eventTable");

        for (let i = 0; i < eventData.length; i++) {
            let nextEvent = "<tr>";
            nextEvent += `<td>${eventData[i].id}</td>`;
            nextEvent += `<td>${eventData[i].name}</td>`;
            nextEvent += `<td>${eventData[i].status}</td>`;
            nextEvent += `<td>${eventData[i].date.slice(0, -14)}</td>`;
            nextEvent += `<td>${eventData[i].begin_time}</td>`;
            nextEvent += `<td>${eventData[i].end_time}</td>`;
            nextEvent += `<td>${eventData[i].place}</td>`;

            nextEvent += `<td><button type="button" class="btn btn-danger eventDelete" data-eventid = "${eventData[i].id}">Verwijderen</button></td>`;

            eventTable.append(nextEvent);
        }

        //Als er op de verwijderen knop wordt gedrukt
        $('.eventDelete').on("click", (event) => {
            event.preventDefault();

            console.log(event.currentTarget.dataset.eventid);
            const eventid = event.currentTarget.dataset.eventid;
            this.eventdelete(eventid);
        });
    }

    async loadReports(){
        const reportData = await this.reportRepository.getAll();
        const reportTable = $("#reportTable");

        for (let i = 0; i < reportData.length; i++) {
            let nextReport = "<tr>";

            nextReport += `<td>${reportData[i].user_id}</td>`;
            nextReport += `<td>${reportData[i].event_id}</td>`;
            nextReport += `<td>${reportData[i].forum_id}</td>`;

            reportTable.append(nextReport);
        }
    }

    //Gebruiker verwijderen
    async userdelete(id) {
        try {
            if (confirm("Weet u zeker dat u deze gebruiker wilt verwijderen?")) {
                alert("Deze gebruiker is verwijderd!");

                const userDelete = await this.userRepository.delete(id);
                console.log(userDelete);

                new WelcomeController();
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Forum verwijderen
    async forumdelete(id) {
        try {
            if (confirm("Weet u zeker dat u dit artikel wilt verwijderen?")) {
                alert("Dit artikel is verwijderd!");

                const forumDelete = await this.forumRepository.delete(id);
                console.log(forumDelete);

                new WelcomeController();
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Activiteit verwijderen
    async eventdelete(id) {
        try {
            if (confirm("Weet u zeker dat u deze activiteit wilt verwijderen?")) {
                alert("Deze activiteit is verwijderd!");

                const eventDelete = await this.eventRepository.delete(id);
                console.log(eventDelete);

                new WelcomeController();
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    }


    error() {
        $(".content").html("Failed to load content")
    }
}