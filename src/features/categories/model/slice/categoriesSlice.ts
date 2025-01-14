import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "../../api/fetchCategories";
import { IExercisesCategoryState } from "../../types/types"
import { fetchCategoryCurrent } from "../../api/fetchCategoryCurrent";
import { createExerciseByCategoryId, deleteExerciseById } from "features/exercises";

const initialState: IExercisesCategoryState = {
    categories: [],
    error: null,
    loading: false,
    category__current: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        toggleExerciseSelected: (state, action) => {
            const exerciseId = action.payload;
            const exercise = state?.category__current.exercises?.find(item => item.id === exerciseId);
            if (exercise) {
                exercise.selected = !exercise.selected;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(fetchCategoryCurrent.fulfilled, (state, action) => {
                state.category__current = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchCategoryCurrent.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchCategoryCurrent.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(createExerciseByCategoryId.fulfilled, (state, action) => {
                state.category__current.exercises = [...state.category__current.exercises, action.payload]
                state.loading = false
                state.error = null
            })
            .addCase(createExerciseByCategoryId.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createExerciseByCategoryId.rejected, (state, action) => {
                state.loading = false
                // state.error = action.payload
            })

            .addCase(deleteExerciseById.fulfilled, (state, action) => {
                state.category__current.exercises = state.category__current.exercises.filter(item => item?.id !== action.payload)
                state.loading = false
                state.error = null
            })
            .addCase(deleteExerciseById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteExerciseById.rejected, (state, action) => {
                state.loading = false
                // state.error = action.payload
            })
    }
})
export const { toggleExerciseSelected } = categoriesSlice.actions;

export default categoriesSlice.reducer