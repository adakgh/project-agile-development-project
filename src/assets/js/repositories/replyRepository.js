class ReplyRepository {

    constructor() {
        this.route = "/reply"
    }

    async getAll(forum_id) {
        return await networkManager
            .doRequest(`${this.route}/getAll`, {
                forum_id: forum_id
            });
    }

    async create(username, reply_text, forum_id) {
        return await networkManager
            .doRequest(`${this.route}/create`, {
                username: username,
                reply_text: reply_text,
                forum_id: forum_id
            });
    }

}