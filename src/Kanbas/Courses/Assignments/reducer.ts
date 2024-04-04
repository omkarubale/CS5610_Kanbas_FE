import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import {
  IKanbasAssignment,
  IKanbasAssignmentSection,
} from "../../store/interfaces/assignments";

const initialState: {
  assignmentsAvailable: boolean;
  assignments: IKanbasAssignment[];
  assignment: IKanbasAssignment;
  assignmentSections: IKanbasAssignmentSection[];
} = {
  assignmentsAvailable: false,
  assignments: [] as IKanbasAssignment[],
  assignment: {
    _id: "",
    courseId: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "2021-01-01",
    availableFromDate: "2021-01-01",
    availableToDate: "2021-01-01",
    sectionId: "",
  },
  assignmentSections: [] as IKanbasAssignmentSection[],
};

const coursesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    setAssignmentSections: (state, action) => {
      state.assignmentSections = action.payload;
    },
    addAssignment: (state, action) => {
      const assignment = action.payload;
      state.assignments = [...state.assignments, assignment];
    },
    removeAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
          return action.payload;
        } else {
          return assignment;
        }
      });
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setAssignmentById: (state, action) => {
      const assignmentId = action.payload;
      const assignment = state.assignments.find((a) => a._id == assignmentId);

      if (assignment !== undefined) state.assignment = assignment;
    },
    setAssignmentEditSectionId: (state, action) => {
      const assignmentSectionId = action.payload;
      const assignmentSection = state.assignmentSections.find(
        (as) => as._id == assignmentSectionId
      );
      if (assignmentSection !== undefined)
        state.assignment.sectionId = assignmentSection._id;
    },
    resetAssignment: (state) => {
      state.assignment._id = "";
      state.assignment.title = "";
      state.assignment.courseId = "";
      state.assignment.description = "";
      state.assignment.points = 100;
      state.assignment.dueDate = "2021-01-01";
      state.assignment.availableFromDate = "2021-01-01";
      state.assignment.availableToDate = "2021-01-01";

      const defaultSection = state.assignmentSections.at(0);
      if (defaultSection !== undefined)
        state.assignment.sectionId = defaultSection._id;
    },
  },
});

export const {
  setAssignments,
  setAssignmentSections,
  addAssignment,
  removeAssignment,
  updateAssignment,
  setAssignment,
  setAssignmentById,
  setAssignmentEditSectionId,
  resetAssignment,
} = coursesSlice.actions;
export default coursesSlice.reducer;
