import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { IKanbasAssignment } from "../../store/interfaces/assignments";

const initialState: {
  assignments: IKanbasAssignment[];
  assignment: IKanbasAssignment;
} = {
  assignments: assignments,
  assignment: {
    _id: "1234",
    title: "New Assignment",
    course: "",
    section: {
      _id: "456",
      course: "",
      title: "New Assignment Section",
      weightage: "100%",
    },
  },
};

const coursesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const courseId = action.payload.course;

      state.assignment = {
        ...state.assignment,
        course: courseId,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, state.assignment];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === state.assignment._id) {
          return state.assignment;
        } else {
          return assignment;
        }
      });
    },
    selectAssignment: (state, action) => {
      state.assignment = action.payload;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  selectAssignment,
} = coursesSlice.actions;
export default coursesSlice.reducer;
