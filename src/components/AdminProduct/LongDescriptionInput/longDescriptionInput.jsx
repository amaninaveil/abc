import React, { useState } from "react";
import { Col, Row, Input } from "reactstrap";
import "./_longDescriptionInput.scss";

function LongDescriptionInput(props) {
  const { description } = props;
  const [currentDescription, setCurrentDescription] = useState(description);

  return (
    <Row className="mb-4 long-description-input">
      <Col sm={4} className="">
        <Input
          type="text"
          placeholder="Header"
          name="header"
          value={currentDescription?.header}
          onChange={(e) => setCurrentDescription({ header: e.target.value })}
        />
      </Col>
      <Col sm={8} className="">
        <Input
          onChange={(e) => setCurrentDescription({ content: e.target.value })}
          value={currentDescription?.content}
          type="textarea"
          placeholder="Content"
          className="content"
          name="content"
        />
        <i
          className="fas fa-times-circle"
          onClick={() => setCurrentDescription({ header: "", content: "" })}
        ></i>
      </Col>
    </Row>
  );
}

LongDescriptionInput.propTypes = {};

export default LongDescriptionInput;
