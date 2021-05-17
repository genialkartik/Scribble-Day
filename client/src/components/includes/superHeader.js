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
            &nbsp;Order your Scribble Tee now and get a change to win
            <a
              href={"https://rzp.io/l/Up18AjAWH"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <strong
                style={{
                  backgroundColor: "#02203C",
                  color: "#fff",
                  paddingBlock: "3px",
                  paddingInline: "40px",
                  borderRadius: "5px",
                }}
              >
                25% CASHBACK offer
              </strong>
              <img
                style={{ width: "40px" }}
                src={require("../../assets/offer.gif")}
              />
            </a>
          </Col>
          <div className="nav-github-icon">
            <a
              href="https://github.com/genialkartik/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon style={{ color: "#000" }} />
            </a>
          </div>
        </Row>
      </Container>
    </div>
  );
}
