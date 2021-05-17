import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./resources.css";

export default function Resources() {
  return (
    <>
      <SuperHeader />
      <div className="about-cont">
        <div className="container">
          <br />
          <br />

          <div
            className="navWrapper"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "start",
            }}
          >
            <Link className={"action"} to={"/"}>
              <Button
                style={{
                  marginInline: 30,
                }}
                variant="contained"
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </Link>
            <Link className={"actions"} to={"/resources"}>
              <Button
                variant="contained"
                style={{
                  marginInline: 30,
                }}
                startIcon={<InfoIcon />}
              >
                Resources
              </Button>
            </Link>
            <Link className={"actions"} to={"/faq"}>
              <Button
                variant="contained"
                style={{
                  marginInline: 30,
                }}
                startIcon={<HelpIcon />}
              >
                FAQ
              </Button>
            </Link>
            <Link className={"actions"} to={"/about"}>
              <Button
                variant="contained"
                style={{
                  marginInline: 30,
                }}
                startIcon={<LabelImportantIcon />}
              >
                About
              </Button>
            </Link>
          </div>
          <div className="text-center mb-5">
            <div className="m-2">
              <h1 className="m-5">Resources {"&"} Guidelines</h1>
            </div>
          </div>
        </div>

        <div className="about-cont">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="d-flex flex-column align-items-center">
                  <div className="text-center">
                    <p>
                      This Pandemic (Covid-19) already caused a lot of
                      mishappening this year and the last year. We must stay
                      safe, healthy and connected. Scribble Day is supposed to
                      bring remarkable and unforgettable moments in our lives
                      and so do this year's Virtual Scribble Day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="row justify-content-center pt-5 pb-5">
              <div className="col-12 col-sm-8">
                <div className="border-bottom">
                  <h4>Let's make this year's Scribble Day remarkable</h4>
                </div>

                <p className="pt-3">
                  A detailed video demonstration of how to write a scribble
                  message to your friend
                </p>
                <div className="row justify-content-center mb-5">
                  <div className="video_wrapper">
                    <video
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      src="https://youtu.be/C85cOVrD2NA"
                    ></video>
                  </div>
                  <div className="title_wrap">v.1 Web Browser</div>
                </div>

                <div className="row justify-content-center mb-5">
                  <div className="video_wrapper">
                    <video
                      style={{ width: "70%", height: "70%" }}
                      controls
                      src="https://developer-assets.paytm.com/sftp/upload/cmsuploads/Dynamic_QR_updated_New_a34b9fc54a.mp4?158619.29000000237"
                    ></video>
                  </div>
                  <div className="title_wrap">v.2 Mobile View</div>
                </div>
              </div>
            </div> */}

            <div className="row justify-content-center pb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="border-bottom">
                    <h4>Does it have any Values?</h4>
                  </div>

                  <p className="pt-3">
                    The most beautiful thing in the world is{" "}
                    <span style={{ color: "#ED72C0" }}>'Happiness'</span> and
                    we're trying to bring it on your 🙂 faces.
                  </p>
                  <ol style={{ textAlign: "justify", color: "#93C2DBaa" }}>
                    <li className="mb-3">
                      This year (2021) and the last year (2020), Covid-19 has
                      shown us numerous gloomy days, and most of them were
                      vicious. We designed and planned to celebrate Scribble Day
                      virtually this year, to bring some happiness on faces and,
                      create {"&"} collect some beautiful memories.
                    </li>
                    <li className="mb-3">
                      Though It's a Scribble Day 2021, but Everyone is welcome!
                      to celebrate and Participants in Virtual Scribble Day
                      2021. Students anywhere and everywhere can participate and
                      write Scribble messages to their friends.
                    </li>
                    <li className="mb-3">
                      There are more strings in this Virtual Scribble Day.
                      Celebaate your Scribble Day and store your memories by
                      ordering your Scribble Tshirts online on our platform,
                      safe and secure to your doorsteps.
                    </li>
                  </ol>
                </div>

                <div className="para_wrapper">
                  <h4 className="border-bottom pt-3">Guidelines</h4>
                  <ul className="pt-3" style={{ color: "#93C2DB" }}>
                    <li>
                      You could write a scribble to anyone studying in any
                      university. But we encourage you to write a scribble
                      message to your college/university friends only.
                    </li>
                    <li>
                      We encourage you to write a Scribble Message only if this
                      is the year(2020) or the last year (2020) was the final
                      year of your college/university graduation.
                    </li>
                    <li>
                      You could invite your college/university's faculty and
                      staff members to write a scribble message for you.
                    </li>
                    <li>
                      Please do not intend to offend or troll someone by writing
                      false and ugly scribble messages to anyone. Writing
                      offensive words is strictly prohibited.
                    </li>
                    <li>
                      You must ensure to mention correct email address while
                      ordering your scribble Tshirt, It should be same as you
                      registered with us on{" "}
                      <strong>
                        <a href="/" target="_blank" rel="norefferrer">
                          www.foaxx.com
                        </a>
                      </strong>{" "}
                    </li>
                    <li>
                      Please write us an email (info@ethicallearner.com) or
                      contact (+91-9517716419) us 24/7 in case of any query.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row justify-content-center pb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="pt-5 pb-5 text-center">
                    <h2 style={{ fontWeight: "bold" }}>
                      Major thanks to all of our partners
                    </h2>
                  </div>
                  <div className="d-flex justify-content-center partners">
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <div>
                        <img
                          src={
                            "https://adorway.com/assets/img/logos/logo_lng.png"
                          }
                          alt=""
                        />
                      </div>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <div>
                        <img
                          src={
                            "https://ethicallearner.com/assets/images/el.png"
                          }
                          alt=""
                        />
                      </div>
                    </a>

                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <div>
                        <img
                          style={{ backgroundColor: "transparent" }}
                          src={require("../../../assets/bwayventure.png")}
                          alt=""
                        />
                      </div>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <div>
                        <img
                          src={require("../../../assets/gola_tourism.jpg")}
                          alt=""
                        />
                      </div>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <div>
                        <img
                          src={require("../../../assets/CSLlogo.png")}
                          alt=""
                        />
                      </div>
                    </a>
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
