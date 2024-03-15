export interface IKanbasAssignmentSection {
  _id: string;
  course: string;
  title: string;
  weightage: string;
}

export interface IKanbasAssignment {
  _id: string;
  title: string;
  section?: IKanbasAssignmentSection;
  course: string;
}
