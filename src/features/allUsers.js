import {createSlice} from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
    name: "all_users",
    initialState: {
        value: {
            users: []
        }
    },
    reducers: {
        addUser: ({value}, {payload}) => {
            const user = {
                username: payload.username,
                password: payload.passOne,
                role: payload.role,
                image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            }
            value.users.push(user)
        },
        updateUser: ({value}, {payload}) => {
            const {index, current} = payload
            value.users[index] = current
        },
        deleteUser: ({value}, {payload}) => {
            const {index} = payload
            value.users.splice(index, 1);
        }
    }
})


export const {addUser, updateUser, deleteUser} = allUsersSlice.actions
export default allUsersSlice.reducer