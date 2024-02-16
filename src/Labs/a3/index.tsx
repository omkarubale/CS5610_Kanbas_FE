import Classes from "./Classes";
import Styles from "./Styles";
import JavaScript from "./JavaScript";
import Add from "./routing/Add";
import PathParameters from "./routing/PathParameters";
import ConditionalOutput from "./ConditionalOutput";
import Highlight from "./Highlight";

function Assignment3() {
  return (
    <div className="container">
      <h1>Assignment 3</h1>
      <JavaScript />
      <PathParameters />
      <Classes />
      <Styles />
      <ConditionalOutput />
      <Highlight>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga corrupti
        non cumque hic quas officia aliquid nesciunt maxime labore, tempore
        inventore sed explicabo facilis magni perferendis illum. Pariatur, quae
        ipsam?
      </Highlight>
    </div>
  );
}
export default Assignment3;
