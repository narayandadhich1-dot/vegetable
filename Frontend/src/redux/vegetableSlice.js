import { createSlice } from "@reduxjs/toolkit";

const vegetableSlice = createSlice({
    name: "vegetable",
    initialState: {
        allVegetables: [],
        singleVegetable: null,
    },
    reducers: {
        setAllVegetables: (state, action) => {
            state.allVegetables = action.payload;
        },
        setSingleVegetable: (state, action) => {
            state.singleVegetable = action.payload;
        }
    }
});

export const { setAllVegetables, setSingleVegetable } = vegetableSlice.actions;
export default vegetableSlice.reducer;