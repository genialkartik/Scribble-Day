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
        <div class="container">
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
                      Whether it’s your first or fiftieth pull request, there’s
                      always more to learn! We’ve put together a few resources
                      that can help you create quality pull requests, keep your
                      repositories pristine, and build on your open source
                      knowledge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center pt-5 pb-5">
              <div className="col-12 col-sm-8">
                <div className="border-bottom">
                  <h4>Values</h4>
                </div>
                <div>
                  <p className="pt-3">
                    Inspired by you, the community, through your actions and
                    stories.
                  </p>
                  <ol>
                    <li className="mb-3">
                      Everyone is welcome! Participants in Hacktoberfest
                      represented 151 countries and thousands of unique skill
                      sets. This program welcomes everyone already who’s already
                      part of the open source software community, and anyone who
                      is interested in diving in.
                    </li>
                    <li className="mb-3">
                      Everyone is welcome! Participants in Hacktoberfest
                      represented 151 countries and thousands of unique skill
                      sets. This program welcomes everyone already who’s already
                      part of the open source software community, and anyone who
                      is interested in diving in.
                    </li>
                    <li className="mb-3">
                      Everyone is welcome! Participants in Hacktoberfest
                      represented 151 countries and thousands of unique skill
                      sets. This program welcomes everyone already who’s already
                      part of the open source software community, and anyone who
                      is interested in diving in.
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="title_wrap">Web</div>
                  <div className="video_wrapper">
                    <video
                      style={{ width: "100%", height: "100%" }}
                      controls
                      src="https://assets.mixkit.co/videos/preview/mixkit-skyline-of-a-desert-with-the-moon-at-night-40047-large.mp4"
                    ></video>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="title_wrap">Mobile</div>
                  <div className="video_wrapper">
                    <video
                      style={{ width: "100%", height: "100%" }}
                      controls
                      src="https://assets.mixkit.co/videos/preview/mixkit-skyline-of-a-desert-with-the-moon-at-night-40047-large.mp4"
                    ></video>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center pb-5">
              <div className="col-12 col-sm-8">
                <div className="para_wrapper">
                  <h3>Let's work together to reduce spam</h3>
                  <ul>
                    <li>
                      Spammy pull requests can be labeled as "invalid."
                      Maintainers are faced with the majority of spam that
                      occurs during Hacktoberfest, and we dislike spam just as
                      much as you. If you're a maintainer, please label any
                      spammy pull requests submitted to the repositories you
                      maintain as invalid, and close them. Pull requests with
                      this label won't count toward Hacktoberfest.
                    </li>
                    <li>
                      There's a seven-day review window for all pull requests
                      before they count toward completing the challenge. Once a
                      participant has submitted four eligible pull requests
                      (ready-to-review, not drafts), the review window begins.
                      This period gives maintainers time to identify and label
                      spammy pull requests as invalid. If the pull requests are
                      not marked as invalid within that window, they will allow
                      the user to complete the Hacktoberfest challenge. If any
                      of the pull requests are labeled as invalid, the user will
                      return to the pending state until they have four eligible
                      pull requests, at which point the review period will start
                      again.
                    </li>
                    <li>
                      Bad repositories will be excluded. In the past, we've seen
                      many repositories that encourage participants to make
                      simple pull requests – such as adding their name to a file
                      – to quickly gain a pull request toward completing
                      Hacktoberfest. While this may be a learning tool for new
                      contributors, it goes against one of our core values for
                      Hacktoberfest. The quality of pull requests is paramount;
                      quantity comes second. These repositories do not encourage
                      quality contributions and provide an unfair advantage in
                      completing the Hacktoberfest challenge. We've implemented
                      a system to block these repositories, and any pull
                      requests submitted to such repositories will not be
                      counted.
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
                    <a href="">
                      <div>
                        <img
                          src={
                            "https://adorway.com/assets/img/logos/logo_lng.png"
                          }
                          alt=""
                        />
                      </div>
                    </a>
                    <a href="">
                      <div>
                        <img
                          src={
                            "https://ethicallearner.com/assets/images/el.png"
                          }
                          alt=""
                        />
                      </div>
                    </a>
                    <a href="">
                      <div>
                        <img
                          src={
                            "https://ethicallearner.com/assets/images/el.png"
                          }
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
