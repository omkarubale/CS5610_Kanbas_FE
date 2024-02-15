const square = (a: number) => a * a;
const plusOne = (a: number) => a + 1;
const twoSquared = square(2);
const threePlusOne = plusOne(3);

function FunctionParanthesisAndParameters() {
  return (
    <>
      <h3>Paranthesis and parameters</h3>
      twoSquared = {twoSquared}
      <br />
      square(2) = {square(2)}
      threePlusOne = {threePlusOne}
      <br />
      plusOne(3) = {plusOne(3)}
    </>
  );
}

export default FunctionParanthesisAndParameters;
