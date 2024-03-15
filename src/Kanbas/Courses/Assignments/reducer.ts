import { createSlice, Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { assignments, assignmentSections } from "../../Database";
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
    course: "",
    title: "",
    description: "",
    points: 100,
    dueDate: "2021-01-01",
    availableFromDate: "2021-01-01",
    availableToDate: "2021-01-01",
    section: undefined,
  },
  assignmentSections: [] as IKanbasAssignmentSection[],
};

const coursesSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      if (!state.assignmentsAvailable) {
        state.assignments = action.payload;
        state.assignmentsAvailable = true;
      }
    },
    setAssignmentSections: (state, action) => {
      state.assignmentSections = action.payload;
    },
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
    setAssignment: (state, action) => {
      console.log("set: ", action.payload);
      state.assignment = action.payload;
    },
    setAssignmentById: (state, action) => {
      const assignmentId = action.payload;
      const assignment = state.assignments.find((a) => a._id == assignmentId);

      if (assignment !== undefined) state.assignment = assignment;
    },
    resetAssignment: (state) => {
      state.assignment._id = "";
      state.assignment.title = "";
      state.assignment.course = "";
      state.assignment.description = "";
      state.assignment.points = 100;
      state.assignment.dueDate = "2021-01-01";
      state.assignment.availableFromDate = "2021-01-01";
      state.assignment.availableToDate = "2021-01-01";
      state.assignment.section = undefined;
    },
  },
});

export const {
  setAssignments,
  setAssignmentSections,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignment,
  setAssignmentById,
  resetAssignment,
} = coursesSlice.actions;
export default coursesSlice.reducer;

export const fetchAssignments = async (
  dispatch: Dispatch<UnknownAction>,
  courseId: string
) => {
  const _assignments = assignments
    .filter((a) => a.course == courseId)
    .map((assignment) => {
      return {
        _id: assignment._id,
        course: assignment.course,
        title: assignment.title,
        section: assignmentSections.find(
          (section) => section._id == assignment.sectionId
        ),
      } as IKanbasAssignment;
    });
  dispatch(setAssignments(_assignments));

  const _assignmentSections = assignmentSections
    .filter((as) => as.course == courseId)
    .map((assignmentSection) => {
      return {
        _id: assignmentSection._id,
        course: assignmentSection.course,
        title: assignmentSection.title,
        weightage: assignmentSection.weightage,
      } as IKanbasAssignmentSection;
    });
  dispatch(setAssignmentSections(_assignmentSections));
};
