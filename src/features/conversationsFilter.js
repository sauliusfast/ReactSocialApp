export function conversationsFilter(allConversationsState, userLoggedIn) {
    const conversations = {};

    allConversationsState.conversations.filter(function (el) {
        return el.chat_id.indexOf(userLoggedIn + "_" + el.sender) > -1 ||
            el.chat_id.indexOf(userLoggedIn + "_" + el.receiver) > -1 ||
            el.chat_id.indexOf(el.receiver + "_" + userLoggedIn) > -1 ||
            el.chat_id.indexOf(el.sender + "_" + userLoggedIn) > -1;
    }).map(function (conversation) {
        conversations[conversation.chat_id] = conversation;
        return conversation;
    });

    return Object.keys(conversations)
        .map(function (key) {
            return conversations[key];
        });
}