import React from "react";

import InfoIcon from "@material-ui/icons/Info";
import HelpIcon from "@material-ui/icons/Help";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./about.css";

export default function About() {
  return (
    <>
      <SuperHeader />
      <div className="about-cont">
        <div className="">
          <div className="container py-5">
            <div
              className="navWrapper"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "start",
              }}
            >
              <a className={"action"} href={"/"}>
                <Button
                  style={{
                    marginInline: 30,
                  }}
                  variant="contained"
                  onClick={() => {
                    window.location.replace("/");
                  }}
                  startIcon={<HomeIcon />}
                >
                  Home
                </Button>
              </a>
              <a className={"actions"} href={"/resources"}>
                <Button
                  variant="contained"
                  style={{
                    marginInline: 30,
                  }}
                  startIcon={<InfoIcon />}
                >
                  Resources
                </Button>
              </a>
              <a className={"actions"} href={"/faq"}>
                <Button
                  variant="contained"
                  style={{
                    marginInline: 30,
                  }}
                  startIcon={<HelpIcon />}
                >
                  FAQ
                </Button>
              </a>
            </div>
            <div className="row h-100 align-items-center py-5">
              <div className="fox-intro col-lg-6">
                <h1 className="display-4">Foaxx</h1>
                <br />
                <h4 className="mb-0">
                  Foaxx is an e-commerce based StartUp idea.
                </h4>
                <p className="lead">
                  Empowered under the hood of{" "}
                  <a href="https://adorway.com">Adoway Pvt. Ltd.</a>
                </p>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <img
                  src="https://scribble2021.s3.ap-south-1.amazonaws.com/ScribbleDayLogo2021.png"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="about-section-2 py-5">
          <div className="container py-5">
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 order-2 order-lg-1">
                <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
                <h2 className="font-weight-light">
                  How does this Idea come into play?
                </h2>
                <p className="font-italic mb-4">
                  A random guy,{" "}
                  <a
                    href="https://linkedin.com/in/genial-kartik/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kartik Tyagi
                  </a>
                  , from a solidarity engineering community as a developer was
                  very displeased for not been able to celebrate Scribble Day
                  (last but the most important day in the life of a graduate)
                  due to Pandemic (Covid-19). However, A Pandemic could stop a
                  graduate but not a passionate developer. And So,{" "}
                  <a href="/" rel="noopener noreferrer">
                    Foaxx.com
                  </a>
                </p>
              </div>
              <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1556834139/img-1_e25nvh.jpg"
                  alt=""
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-5 px-5 mx-auto">
                <img
                  src="https://res.cloudinary.com/mhmd/image/upload/v1556834136/img-2_vdgqgn.jpg"
                  alt=""
                  className="img-fluid mb-4 mb-lg-0"
                />
              </div>
              <div className="col-lg-6">
                <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
                <h2 className="font-weight-light">
                  Are we different and trust-worthy?
                </h2>
                <p className="font-italic mb-4">
                  Once a popular guy said, "The most expensive thing in the
                  world is trust, and cheap people can't afford it!" But do not
                  call you cheap person, we just need to have your trust on us
                  from sharing this exciting and unique idea with your friends
                  to placing the order of your scribble tshirt on your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className=" py-5">
          <div className="container py-5">
            <div className="row mb-4">
              <div className="col-lg-5">
                <h2 className="display-4 font-weight-light">Our team</h2>
                <p className="font-italic">
                  Team behind the Success of this exquiste Idea
                </p>
              </div>
            </div>

            <div className="row text-center">
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="rounded shadow-sm py-5 px-4 team-cards">
                  <img
                    src="https://avatars.githubusercontent.com/u/32240906?v=4"
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0 member-name">Kartik Tyagi</h5>
                  <span className="small text-uppercase  ">Project Lead</span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="rounded shadow-sm py-5 px-4 team-cards">
                  <img
                    src="https://avatars.githubusercontent.com/u/36108781?v=4"
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0 member-name">Madan Parmar</h5>
                  <span className="small text-uppercase  ">Developer</span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="rounded shadow-sm py-5 px-4 team-cards">
                  <img
                    src="https://el-testing.s3.ap-south-1.amazonaws.com/tajwarkhan.jpg"
                    alt=""
                    width="100"
                    style={{ height: "100px" }}
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0 member-name">Tajwar Khan</h5>
                  <span className="small text-uppercase  ">Manager</span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-instagram"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="social-link">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="rounded shadow-sm py-5 px-6 team-cards">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.M7IvOH4RnuewgSwH-Bg0XQHaHO%26pid%3DApi&f=1"
                    alt=""
                    width="100"
                    style={{ height: "100px" }}
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0 member-name">You</h5>
                  <span className="small text-uppercase  ">Dear Friend</span>
                  <br />
                  <div style={{ marginInline: "15px" }} className="text-muted">
                    It won't be possible without your, our dear friend!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
