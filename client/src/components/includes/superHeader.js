import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import announcement from "../../assets/announcement.png";
import GitHubIcon from "@material-ui/icons/GitHub";

export default function SuperHeader() {
  return (
    <div>
      <Container fluid className={"nav center"}>
        <Row className={"container text-center"}>
          <Col>
            <img src={announcement} height="40px" alt="announcement" />{" "}
            &nbsp;Make your virtual Scribble Day more exciting by
            <a
              href={"https://rzp.io/l/Up18AjAWH"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              Placing ORDER of your SCRRIBLE TSHIRT
            </a>
          </Col>
          <div className="nav-github-icon">
            <a
              href="https://github.com/genialkartik/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
}
