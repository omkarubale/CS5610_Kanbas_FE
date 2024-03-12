export interface IKanbasModuleLesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface IKanbasModule {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: IKanbasModuleLesson[];
}
