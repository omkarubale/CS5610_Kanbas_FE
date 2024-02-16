import Destructing from "../json/Destructing";
import FunctionDestructing from "../json/FunctionDestructing";
import House from "../json/House";
import JsonStringify from "../json/JsonStringify";
import Spreading from "../json/Spreading";
import TemplateLiterals from "../string/TemplateLiterals";
import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndexFunction from "./FindIndexFunction";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";

var functionScoped = 2;
let blockScoped = 5;
const constant1 = functionScoped - blockScoped;
let numberArray1 = [1, 2, 3, 4, 5];
let stringArray1 = ["string1", "string2"];

let variableArray1 = [
  functionScoped,
  blockScoped,
  constant1,
  numberArray1,
  stringArray1,
];

function WorkingWithArrays() {
  return (
    <>
      <h2>Working with Arrays</h2>
      numberArray1 = {numberArray1}
      <br />
      stringArray1 = {stringArray1}
      <br />
      variableArray1 = {variableArray1}
      <br />
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
    </>
  );
}

export default WorkingWithArrays;
