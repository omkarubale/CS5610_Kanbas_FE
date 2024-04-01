import React, { useState } from "react";

function EncodingParametersInURLs() {
  const [a, setA] = useState<number>(34);
  const [b, setB] = useState<number>(23);
  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Calculator</h4>
      <input
        className="form-control mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
      />
      <input
        className="form-control mb-2"
        type="number"
        onChange={(e) => setB(parseInt(e.target.value))}
        value={b}
      />
      <h3>Path Parameters</h3>
      <a
        className="btn btn-primary"
        href={`http://localhost:4000/a5/add/${a}/${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger"
        href={`http://localhost:4000/a5/subtract/${a}/${b}`}
      >
        Substract {a} - {b}
      </a>
    </div>
  );
}
export default EncodingParametersInURLs;
