import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { IKanbasCourse } from "../store/interfaces/courses";

const initialState: { courses: IKanbasCourse[]; course: IKanbasCourse } = {
  courses: courses,
  course: {
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state) => {
      state.courses = [
        ...state.courses,
        { ...state.course, _id: new Date().getTime().toString() },
      ];
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    updateCourse: (state) => {
      state.courses = state.courses.map((course) => {
        if (course._id === state.course._id) {
          return state.course;
        } else {
          return course;
        }
      });
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, setCourse } =
  coursesSlice.actions;
export default coursesSlice.reducer;
