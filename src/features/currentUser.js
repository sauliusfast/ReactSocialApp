import {createSlice} from "@reduxjs/toolkit";

export const currentUserSlice = createSlice({
    name: "current_user",
    initialState: {
        value: {
            user: null
        }
    },
    reducers: {
        setCurrentUser: ({value}, {payload}) => {
            value.user = payload
        }
    }
})


export const {setCurrentUser} = currentUserSlice.actions
export default currentUserSlice.reducer