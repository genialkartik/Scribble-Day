import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from "@material-ui/icons/Help";
import InfoIcon from "@material-ui/icons/Info";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";

import faq from "../../../assets/faq.png";
import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./faq.css";

export default function Faq() {
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
              <h1 className="m-5">Frequently Asked Questions</h1>
            </div>
          </div>

          <div className="alert alert-warning alert-dismissible" role="alert">
            <button type="button" className="close" data-dismiss="alert">
              <span aria-hidden="true">&times;</span>
              <span className="sr-only">Close</span>
            </button>
            This section contains a wealth of information, related to{" "}
            <strong>Placing Order and Demo</strong> and its ease of use. If you
            cannot find an answer to your question, make sure to contact us.
          </div>

          <br />

          <div className="" id="accordion">
            <div className="faqHeader">General questions</div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseOne"
                  >
                    Do I have to register myself before making a purchase?
                  </a>
                </h4>
              </div>
              <div id="collapseOne" className="panel-collapse collapse in">
                <div className="card-block">
                  Yes, Before writing a scribble message to your friends you
                  have to register yourself by using your email, and after the
                  successful verification of email, you are ready to write a
                  scribble for your friends.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTen"
                  >
                    How can I get scribbles from my friends?
                  </a>
                </h4>
              </div>
              <div id="collapseTen" className="panel-collapse collapse">
                <div className="card-block">
                  In order to get scribbles from your friends, you have to share
                  your scribble link through WhatsApp, Instagram or by using any
                  other social media platform. Use methods to share your
                  scribble with friends:
                  <ul>
                    <li>
                      Register an account, Goto 'My Scribbles' and click on any
                      social media icon to share your profile link
                    </li>
                    <li>
                      Ask your friend to join{" "}
                      <strong>
                        <a href="/" target="_blank" rel="norefferrer">
                          www.foaxx.com
                        </a>
                      </strong>{" "}
                      and find your profile by your university and your Name.
                    </li>
                    <li>
                      Download your Scribble T-shirt and share your profile link
                      or{" "}
                      <strong>
                        <a href="/" target="_blank" rel="norefferrer">
                          www.foaxx.com
                        </a>
                      </strong>{" "}
                    </li>
                    <li>
                      Click on 'Invite Friend and share text or click on any
                      social media Icon to let your friend about us.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEleven"
                  >
                    Is there any limit to writing scribble messages on T-shirts?
                  </a>
                </h4>
              </div>
              <div id="collapseEleven" className="panel-collapse collapse">
                <div className="card-block">
                  Gosh!! No. There is no limit to getting scribble messages from
                  your friends as such if you are having enough space on your
                  virtual Tshirt. We want to create memories with you, how could
                  we think as such! <br />
                  Though to friends can only write one scribble to each other.
                </div>
              </div>
            </div>

            <div className="faqHeader">Shipping</div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTwo"
                  >
                    Can I order my scribble t-shirt?
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" className="panel-collapse collapse">
                <div className="card-block">
                  Yes of course! We're here to no just create memories but also
                  to share and safely deliver to you.
                  <br /> You can order your scribble t-shirt, by clicking on the
                  “Place Order” button. A detailed instructions will be shown
                  accordingly.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseThree"
                  >
                    How could I pay for my Scribble T-shirt?
                  </a>
                </h4>
              </div>
              <div id="collapseThree" className="panel-collapse collapse">
                <div className="card-block">
                  You could pay for your Scribble T-shirt by using any payment
                  method. By clicking on 'Place Order' followed by 'Checkout',
                  you'll be directed to Razorpay portal. There you could make
                  your payment by using any payment method you like.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFive"
                  >
                    Do you ship the items to an international address?
                  </a>
                </h4>
              </div>
              <div id="collapseFive" className="panel-collapse collapse">
                <div className="card-block">
                  At present, we are only offering local shipping orders in
                  India Only. But we would love to help you out, so call our
                  Foaxx executive and we can see if it can be worked out.
                  <br />
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSix"
                  >
                    How can I change the shipping address of my order?
                  </a>
                </h4>
              </div>
              <div id="collapseSix" className="panel-collapse collapse">
                <div className="card-block">
                  You cannot change your shipping address after placing the
                  order from your account. <br />
                  But you could send us an email with a Subject 'Change My
                  Shipping Address RegId:123456', previous order details (a PDF,
                  email, or Receipt), and the new Address where you want your
                  package to be delivered.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEight"
                  >
                    How long will it take the package delivered to my doorsteps,
                    safe and secure?
                  </a>
                </h4>
              </div>
              <div id="collapseEight" className="panel-collapse collapse">
                <div className="card-block">
                  Firstly, Thank you for trusting us and placing your order at
                  Foaxx.com. Your purchase will be delivered at your shipping
                  address upto 10-14 days of placing an order.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseNine"
                  >
                    How do you communicate the dispatch and delivery details?
                  </a>
                </h4>
              </div>
              <div id="collapseNine" className="panel-collapse collapse">
                <div className="card-block">
                  We will keep you informed through SMS & Email till your
                  purchase is delivered to you.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseNine"
                  >
                    What happens if my package does not reach my shipping
                    address?
                  </a>
                </h4>
              </div>
              <div id="collapseNine" className="panel-collapse collapse">
                <div className="card-block">
                  Our Delivery partner will make three attempts to deliver
                  before returning the product to our warehouse. You may contact
                  us at info@ethicallearner.com or call Foaxx on +91 9517716419
                  to speak to the executive to place a re-dispatch request. We
                  are available from 11 am to 8 pm all day.
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseNine"
                  >
                    Is there any refund policy?
                  </a>
                </h4>
              </div>
              <div id="collapseNine" className="panel-collapse collapse">
                <div className="card-block">
                  At present, we are commited to deliver you the best quality
                  and nicely decorated products as much as possible. Due lots of
                  supply {"&"} demands, and less resources, we are not being
                  able to entertain you with any return or refund policy. Though
                  your are our prestigious customer, you can us an email on
                  info@ethicallearner.com in case of any query.
                </div>
              </div>
            </div>

            <div className="faqHeader">Guidelines</div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSeven"
                  >
                    What is your return and cancellation policy?
                  </a>
                </h4>
              </div>
              <div id="collapseSeven" className="panel-collapse collapse">
                <div className="card-block">
                  Sorry! At this point of time we don’t have any return and
                  cancellation policy.
                </div>
              </div>
            </div>

            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEleven"
                  >
                    Do you offer Cash on Delivery - COD?
                  </a>
                </h4>
              </div>
              <div id="collapseEleven" className="panel-collapse collapse">
                <div className="card-block">
                  We regret that we are not offering cash on delivery at this
                  point in time
                </div>
              </div>
            </div>
            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseThirteen"
                  >
                    Can I place an order and have it delivered as a gift to an
                    alternate address?
                  </a>
                </h4>
              </div>
              <div id="collapseThirteen" className="panel-collapse collapse">
                <div className="card-block">
                  Yes. We will be happy to have a product delivered as a gift to
                  an alternate address. You just need to correct Email and
                  shipping Address.
                </div>
              </div>
            </div>

            <div className="card ">
              <div className="card-header">
                <h4 className="card-header">
                  <a
                    className="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTwenty"
                  >
                    Do you have any offer on placing order?
                  </a>
                </h4>
              </div>
              <div id="collapseTwenty" className="panel-collapse collapse">
                <div className="card-block">
                  Yes, I are planning to achieve a goal of 500 Tshirts Order.
                  And if we will be able to do so. We will send 25% cashbacks to
                  our first 50 customers who placed orders.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-5">
          <div className="m-2">
            <Image src={faq} />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
