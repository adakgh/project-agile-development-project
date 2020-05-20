class ReportRepository {

    constructor() {
        this.route = "/report"
    }

    async getAll(id, user_id, event_id, forum_id) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                id: id,
                user_id: user_id,
                event_id: event_id,
                forum_id: forum_id
            });
    }

    async reportForum(forum_id) {
        return await networkManager
            .doRequest(`${this.route}/reportForum`, {
                forum_id: forum_id
            });
    }

}