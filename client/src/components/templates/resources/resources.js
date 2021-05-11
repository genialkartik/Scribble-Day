import React from "react";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";

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
            <div className={"action"}>
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
            </div>
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
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
