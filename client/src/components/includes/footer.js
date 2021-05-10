import React from "react";
import "./style.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer-cont pb-5">
        <div class="row bottom-part">
          <div class="d-lg-flex justify-content-between bd-highlight col-md-12 mb-5 px-5">
            <div class="p-2 align-self-center flex-fill bd-highlight">
              <div class="fa fa-facebook px-2"></div>
              <div class="fa fa-linkedin px-2"></div>
              <div class="fa fa-twitter px-2"></div>
              <div class="fa fa-instagram px-2"></div>
            </div>
            <div class="p-2 row flex-fill bd-highlight justify-content-left">
              <div class="p-2 d-lg-flex">
                <a href="/resources">
                  <div class="p-2 flex-fill d-flex bd-highlight">Resources</div>
                </a>
                <a href="/faq">
                  <div class="p-2 flex-fill d-flex bd-highlight">Faq</div>
                </a>
                <a href="/about">
                  <div class="p-2 flex-fill d-flex bd-highlight">About</div>
                </a>
                <a href="https://ethicallearner.com/tnc">
                  <div class="p-2 flex-fill d-flex bd-highlight">Terms</div>
                </a>
                <a href="https://ethicallearner.com/privacy">
                  <div class="p-2 flex-fill d-flex bd-highlight">Privacy</div>
                </a>
              </div>
            </div>
            <div class="p-2 align-self-center flex-fill bd-highlight">
              <div class="fa fa-mobile px-2 grey-text">
                &nbsp;&nbsp;<span id="contact">888-777-666</span>
              </div>
              <div class="fa fa-envelope-o px-2 grey-text">
                &nbsp;&nbsp;info@itcraft.in
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
