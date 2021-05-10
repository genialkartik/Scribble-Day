import React from "react";
import "./style.css";
import footerLogo from '../../assets/footerlogo.svg';

export default function Footer() {
  return (
    <div>
      <footer className="footer-cont">
        <div className="row bottom-part justify-content-between">
          <div className="col-12 col-sm-2">
            <div>
              <a href="https://www.digitalocean.com">
                <div alt="DigitalOcean logo">
                  <div>
                    <image src={footerLogo} alt="Brand Logo at Footer" />
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className="col-12 col-sm-10 d-flex flex-row-reverse">
            <div className=" text-right">
              <div class="fa fa-mobile px-2 grey-text">
                &nbsp;&nbsp;<span id="contact">888-777-666</span>
              </div>
              <div class="fa fa-envelope-o px-2 grey-text">
                &nbsp;&nbsp;info@itcraft.in
              </div>
              <div className="col-12">
                <div class="footer-socials">
                  <div class="fa fa-facebook px-2"></div>
                  <div class="fa fa-linkedin px-2"></div>
                  <div class="fa fa-twitter px-2"></div>
                  <div class="fa fa-instagram px-2"></div>
                </div>
              </div>
            </div>
            

            <div className="col-12 col-sm-10 col-md-8 d-flex justify-content-end align-items-center">
              <div class="footer-links">
                <div class="d-flex">
                  <a href="/resources">
                    <div class="p-2 flex-fill d-flex bd-highlight">Resources</div>
                  </a>
                  <a href="https://ethicallearner.com/tnc">
                    <div class="p-2 flex-fill d-flex bd-highlight">Terms</div>
                  </a>
                  <a href="https://ethicallearner.com/privacy">
                    <div class="p-2 flex-fill d-flex bd-highlight">Privacy</div>
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
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
