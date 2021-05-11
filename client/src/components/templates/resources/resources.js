import React from "react";

import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./resources.css";
import resourceCover from '../../../assets/resources_cover.png';

export default function Resources() {
  return (
    <div className="about-cont">
      <SuperHeader />

        <div className="">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="d-flex flex-column align-items-center">
                  <div className="pt-5">
                    <img src={resourceCover} alt="" />
                  </div>
                  <div className="p-5">
                    <h1>Resources</h1>
                  </div>
                  <div className="text-center">
                    <p>Whether it’s your first or fiftieth pull request, there’s always more to learn! We’ve put together a few resources that can help you create quality pull requests, keep your repositories pristine, and build on your open source knowledge.</p>
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
                  <p className="pt-3">Inspired by you, the community, through your actions and stories.</p>
                  <ol>
                    <li className="mb-3">Everyone is welcome! Participants in Hacktoberfest represented 151 countries and thousands of unique skill sets. This program welcomes everyone already who’s already part of the open source software community, and anyone who is interested in diving in.</li>
                    <li className="mb-3">Everyone is welcome! Participants in Hacktoberfest represented 151 countries and thousands of unique skill sets. This program welcomes everyone already who’s already part of the open source software community, and anyone who is interested in diving in.</li>
                    <li className="mb-3">Everyone is welcome! Participants in Hacktoberfest represented 151 countries and thousands of unique skill sets. This program welcomes everyone already who’s already part of the open source software community, and anyone who is interested in diving in.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="title_wrap">
                    Web
                  </div>
                  <div className="video_wrapper">
                    <video style={{width: '100%', height: '100%'}} controls src="https://assets.mixkit.co/videos/preview/mixkit-skyline-of-a-desert-with-the-moon-at-night-40047-large.mp4"></video>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-8">
                <div>
                  <div className="title_wrap">
                    Mobile
                  </div>
                  <div className="video_wrapper">
                    <video style={{width: '100%', height: '100%'}} controls src="https://assets.mixkit.co/videos/preview/mixkit-skyline-of-a-desert-with-the-moon-at-night-40047-large.mp4"></video>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      <Footer />
    </div>
  );
}
