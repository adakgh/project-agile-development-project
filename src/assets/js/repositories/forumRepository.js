class ForumRepository {
    constructor() {
        this.route = "/forum";
    }

    async create(username, title, forum_text, tag) {
        return await networkManager
            .doRequest(`${this.route}/create`, {
                username: username,
                title: title,
                forum_text: forum_text,
                tag: tag
            });
    }

    async getAll(id, username, title, forum_text, tag) {
        return await networkManager
            .doRequest(this.route, {
                id: id,
                username: username,
                title: title,
                forum_text: forum_text,
                tag: tag
            });
    }

    async delete() {

    }

    async update(id, values = {}) {

    }

}