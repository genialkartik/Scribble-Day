import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import footerLogo from "../../assets/foaxx.png";
import { Image } from "react-bootstrap";

export default function Footer() {
  return (
    <div>
      <footer className="footer-cont">
        <div className="row bottom-part justify-content-between">
          <div className="col-12 col-sm-2">
            <div>
              <Link to="/">
                <div alt="DigitalOcean logo">
                  <div className="logocont">
                    <Image src={footerLogo} width={80} className="logo" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-12 col-sm-10 d-flex flex-row-reverse">
            <div className=" text-right">
              <div className="fa fa-mobile px-2 grey-text">
                &nbsp;&nbsp;+91-9517716419
              </div>
              <div className="fa fa-envelope-o px-2 grey-text">
                &nbsp;&nbsp;info@ethicallearner.com
              </div>
              <div className="col-12">
                <div className="footer-socials">
                  <a
                    href="https://fb.com/genialkartik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="fa fa-facebook px-2"></div>
                  </a>
                  <a
                    href="https://linkedin.com/in/genialkartik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="fa fa-linkedin px-2"></div>
                  </a>
                  <a
                    href="https://twitter.com/genialkartik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="fa fa-twitter px-2"></div>
                  </a>
                  <a
                    href="https://instagram.com/genialkartik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="fa fa-instagram px-2"></div>
                  </a>
                  <a
                    href="https://github.com/genialkartik"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="fa fa-github px-2"></div>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-end align-items-center">
              <div className="footer-links">
                <div className="d-flex">
                  <Link to="/resources">
                    <div className="p-2 flex-fill d-flex bd-highlight">
                      Resources
                    </div>
                  </Link>
                  <Link to="/faq">
                    <div className="p-2 flex-fill d-flex bd-highlight">Faq</div>
                  </Link>
                  <Link to="/about">
                    <div className="p-2 flex-fill d-flex bd-highlight">
                      About
                    </div>
                  </Link>
                  <a
                    href="https://ethicallearner.com/tnc"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-2 flex-fill d-flex bd-highlight">
                      Terms
                    </div>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ethicallearner.com/privacy"
                  >
                    <div className="p-2 flex-fill d-flex bd-highlight">
                      Privacy
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
