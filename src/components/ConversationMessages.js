import {useSelector} from "react-redux";
import SingleMessage from "./SingleMessage";

const ConversationMessages = ({sender, receiver}) => {
    const allMessagesState = useSelector(state => state.conversations.value)

    const messages = allMessagesState.conversations.filter(function (el) {
        return el.chat_id.indexOf(sender.username + "_" + receiver.username) > -1 || el.chat_id.indexOf(receiver.username + "_" + sender.username) > -1;
    }).map(function (conversation) {
        return conversation;
    });

    return (
        messages.map(x => <SingleMessage key={x.datetime} message={x}/>)
    );
};

export default ConversationMessages;