import Add from "../routing/Add";
import AddingAndRemovingDataToFromArrays from "./arrays/AddingAndRemovingDataToFromArrays";
import ArrayIndexAndLength from "./arrays/ArrayIndexAndLength";
import FilterFunction from "./arrays/FilterFunction";
import FindFunction from "./arrays/FindFunction";
import FindIndexFunction from "./arrays/FindIndexFunction";
import ForLoops from "./arrays/ForLoops";
import MapFunction from "./arrays/MapFunction";
import WorkingWithArrays from "./arrays/WorkingWithArrays";
import IfElse from "./conditionals/IfElse";
import TernaryOperator from "./conditionals/TernaryOperator";
import ArrowFunctions from "./functions/ArrowFunctions";
import ES5Functions from "./functions/ES5Functions";
import FunctionParanthesisAndParameters from "./functions/FunctionParanthesisAndParameters";
import ImpliedReturn from "./functions/ImpliedReturn";
import Destructing from "./json/Destructing";
import FunctionDestructing from "./json/FunctionDestructing";
import House from "./json/House";
import JsonStringify from "./json/JsonStringify";
import Spreading from "./json/Spreading";
import TemplateLiterals from "./string/TemplateLiterals";
import BooleanVariables from "./variables/BooleanVariables";
import VariableTypes from "./variables/VariableTypes";
import VariablesAndConstants from "./variables/VariablesAndConstants";

function JavaScript() {
  // console.log("Hello World!");
  return (
    <div>
      <h1>JavaScript</h1>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ES5Functions />
      <ArrowFunctions />
      <ImpliedReturn />
      <FunctionParanthesisAndParameters />
      <WorkingWithArrays />
      <ArrayIndexAndLength />
      <AddingAndRemovingDataToFromArrays />
      <ForLoops />
      <MapFunction />
      <JsonStringify />
      <FindFunction />
      <FindIndexFunction />
      <FilterFunction />
      <TemplateLiterals />
      <House />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
    </div>
  );
}
export default JavaScript;
