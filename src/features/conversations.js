import {createSlice} from "@reduxjs/toolkit";

export const conversationsSlice = createSlice({
    name: "conversations",
    initialState: {
        value: {
            conversations: []
        }
    },
    reducers: {
        addConversation: ({value}, {payload}) => {
            const conversation = {
                sender: payload.sender,
                receiver: payload.receiver,
                message: payload.message,
                datetime: payload.datetime,
                chat_id: payload.chat_id
            }

            value.conversations.push(conversation)
        },
        deleteConversation: ({value}, {payload}) => {
            const {messages} = payload
            messages.map(function (message) {
                const index = value.conversations.findIndex(x => x.chat_id === message.chat_id)
                return value.conversations.splice(index, 1);
            });
        }
    }
})


export const {addConversation, deleteConversation} = conversationsSlice.actions
export default conversationsSlice.reducer