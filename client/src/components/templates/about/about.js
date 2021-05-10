import React from "react";

import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./about.css";

export default function About() {
  return (
    <div className="about-cont">
      <SuperHeader />
      <div className="">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4">About us page</h1>
              <p className="lead text-muted mb-0">
                Create a minimal about us page using Bootstrap 4.
              </p>
              <p className="lead text-muted">
                Snippet by{" "}
                <a
                  href="https://bootstrapious.com/snippets"
                  className="text-muted"
                >
                  <u>Bootstrapious</u>
                </a>
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
              <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
              <p className="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
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
              <h2 className="font-weight-light">Lorem ipsum dolor sit amet</h2>
              <p className="font-italic text-muted mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a href="#" className="btn btn-light px-5 rounded-pill shadow-sm">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-5">
        <div className="container py-5">
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light">Our team</h2>
              <p className="font-italic text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <div className="row text-center">
            {[1, 2, 3, 4].map(() => (
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="rounded shadow-sm py-5 px-4 team-cards">
                  <img
                    src="https://avatars.githubusercontent.com/u/32240906?v=4"
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0 member-name">Kartik Tyagi</h5>
                  <span className="small text-uppercase text-muted">
                    Project Lead
                  </span>
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
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
