import {createSlice} from "@reduxjs/toolkit";

export const blockedUsersSlice = createSlice({
    name: "blockedUsers",
    initialState: {
        value: {
            blockedUsers: []
        }
    },
    reducers: {
        addUserBlock: ({value}, {payload}) => {
            const userBlock = {
                initiator: payload.initiator,
                blockedUser: payload.blockedUser,
            }

            value.blockedUsers.push(userBlock)
        },
        deleteUserBlock: ({value}, {payload}) => {
            const {index} = payload
            value.blockedUsers.splice(index, 1);
        }
    }
})


export const {addUserBlock, deleteUserBlock} = blockedUsersSlice.actions
export default blockedUsersSlice.reducer