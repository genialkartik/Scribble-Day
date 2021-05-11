import React from "react";
import { Image } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";

import faq from "../../../assets/faq.png";
import Footer from "../../includes/footer";
import SuperHeader from "../../includes/superHeader";
import "./faq.css";

export default function Faq() {
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
          </div>
          <div className="text-center mb-5">
            <div className="m-2">
              <h1 className="m-5">Frequently Asked Questions</h1>
            </div>
          </div>

          <div class="alert alert-warning alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            This section contains a wealth of information, related to{" "}
            <strong>Placing Order and Demo</strong> and its ease of use. If you
            cannot find an answer to your question, make sure to contact us.
          </div>

          <br />

          <div class="" id="accordion">
            <div class="faqHeader">General questions</div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseOne"
                  >
                    Do I have to register myself before making a purchase?
                  </a>
                </h4>
              </div>
              <div id="collapseOne" class="panel-collapse collapse in">
                <div class="card-block">
                  While you may enjoy writing the scribble at leisure, we advise
                  you to register at the time of check out for the first time to
                  enjoy a superior shopping experience every time you visit us.
                  We will also keep you updated on your orders and refunds
                  through SMS/email. We will require you to register at
                  checkout.
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTen"
                  >
                    How often do you come up with a new design/collection?{" "}
                  </a>
                </h4>
              </div>
              <div id="collapseTen" class="panel-collapse collapse">
                <div class="card-block">
                  The core of the brand is to provide branded scribble t-shirts.
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEleven"
                  >
                    Apart from an online presence do you also have a Retail
                    presence?
                  </a>
                </h4>
              </div>
              <div id="collapseEleven" class="panel-collapse collapse">
                <div class="card-block">No!</div>
              </div>
            </div>

            <div class="faqHeader">Shipping</div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTwo"
                  >
                    How do you ship the purchased items? Are there any charges?
                  </a>
                </h4>
              </div>
              <div id="collapseTwo" class="panel-collapse collapse">
                <div class="card-block">
                  At Foaxx, we ensure that our customers receive the purchased
                  items in the finest condition and on time. Depending on your
                  location, the product will be delivered to your doorstep upto
                  7- 10 days. We offer free shipping on scribble day T-shirts.
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseThree"
                  >
                    I want to place my t-shirt - what are the steps?
                  </a>
                </h4>
              </div>
              <div id="collapseThree" class="panel-collapse collapse">
                <div class="card-block">
                  The steps involved in this process are really simple. All you
                  need to do is:
                  <ul>
                    <li>Register an account</li>
                    <li>
                      Invite your friends to write Scribbles on your tshirt
                    </li>
                    <li>
                      Click on{" "}
                      <strong>
                        <a href="">Place Order</a>
                      </strong>{" "}
                      button and Place the order on the page your are directed
                      to.
                    </li>
                    <li>
                      Now!! give us to verify your order. You'll receive an
                      email regarding the order details.
                    </li>
                    <li>
                      You'll might experience a delay in shipping or order due
                      to Pandemic cause by Covid-19. But believe us, patience of
                      few days is better than not celebrating Scribble Day (the
                      best moment of everyone's life, we believe)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFive"
                  >
                    Do you ship the items to an international address?
                  </a>
                </h4>
              </div>
              <div id="collapseFive" class="panel-collapse collapse">
                <div class="card-block">
                  At present, we are only offering local shipping of orders. But
                  we would love to help you out, so call our Foaxx executive and
                  we can see if it can be worked out.
                  <br />
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSix"
                  >
                    How can I change the shipping address of my order?
                  </a>
                </h4>
              </div>
              <div id="collapseSix" class="panel-collapse collapse">
                <div class="card-block">
                  You cannot change your shipping address at the time of placing
                  the order in your account. But you cannot change the address
                  after placing your order. You will be required to send us an
                  email with a Subject 'Change Shipping Address' and previous
                  order details, the new address will also be required.
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEight"
                  >
                    What do I need to do if I have forgotten my pin?
                  </a>
                </h4>
              </div>
              <div id="collapseEight" class="panel-collapse collapse">
                <div class="card-block">
                  Just drop an email to info@ethicallearner.com
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseNine"
                  >
                    How do you communicate the dispatch and delivery details?
                  </a>
                </h4>
              </div>
              <div id="collapseNine" class="panel-collapse collapse">
                <div class="card-block">
                  We will keep you informed through SMS & Email till your
                  purchase is delivered to you.
                </div>
              </div>
            </div>

            <div class="faqHeader">Guidelines</div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFour"
                  >
                    What happens if your courier is unable to deliver the
                    product?
                  </a>
                </h4>
              </div>
              <div id="collapseFour" class="panel-collapse collapse">
                <div class="card-block">
                  Our Delivery partner will make three attempts to deliver
                  before returning the product to our warehouse. You may contact
                  us at info@ethicallearner.com or call Foaxx on 0000000000 to
                  speak to the executive to place a re-dispatch request. We are
                  available from 11 am to 8 pm all days
                </div>
              </div>
            </div>
            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSeven"
                  >
                    What is your return and cancellation policy?
                  </a>
                </h4>
              </div>
              <div id="collapseSeven" class="panel-collapse collapse">
                <div class="card-block">
                  Sorry! At this point of time we don’t have any return and
                  cancellation policy.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEleven"
                  >
                    Do you offer Cash on Delivery - COD?
                  </a>
                </h4>
              </div>
              <div id="collapseEleven" class="panel-collapse collapse">
                <div class="card-block">
                  We regret that we are not offering cash on delivery at this
                  point in time
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTwelve"
                  >
                    I have placed an order, how soon will I receive the same?
                  </a>
                </h4>
              </div>
              <div id="collapseTwelve" class="panel-collapse collapse">
                <div class="card-block">
                  Thank you for shopping at Foaxx. Your purchase will be
                  delivered at your shipping address upto 7-10 days of placing
                  an order.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseThirteen"
                  >
                    Can I place an order and have it delivered as a gift to an
                    alternate address?
                  </a>
                </h4>
              </div>
              <div id="collapseThirteen" class="panel-collapse collapse">
                <div class="card-block">
                  Yes. We will be happy to have a product delivered as a gift to
                  an alternate address.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFouteen"
                  >
                    Do you offer gift wrapping?
                  </a>
                </h4>
              </div>
              <div id="collapseFourteen" class="panel-collapse collapse">
                <div class="card-block">
                  At Foaxx, we would like to offer you the best shopping
                  experience. We will be happy to gift wrap your purchase as a
                  service gesture.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseFifteen"
                  >
                    I seem to have received a damaged item. Who do I inform?
                  </a>
                </h4>
              </div>
              <div id="collapseFifteen" class="panel-collapse collapse">
                <div class="card-block">
                  We regret the experience and apologies for the inconvenience.
                  In an unlikely event that your order arrives in a damaged
                  condition, please email us with an image of the damaged
                  merchandise at info@ethicallearner.com To be eligible for a
                  return, you must notify us of the damage within 48 hours of
                  receiving the order
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSixteen"
                  >
                    I seem to have received an incorrect item. What should I do?
                  </a>
                </h4>
              </div>
              <div id="collapseSixteen" class="panel-collapse collapse">
                <div class="card-block">
                  We apologise for the inconvenience. Please contact us at
                  info@ethicallearner.com or call us on 0000000000 to speak to
                  the Foaxx executive. We are available from 11 am to 10.00 pm
                  on all days of the week
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseSeventeen"
                  >
                    How can I cancel an order that I placed online?
                  </a>
                </h4>
              </div>
              <div id="collapseSeventeen" class="panel-collapse collapse">
                <div class="card-block">
                  You may cancel your order by calling us on 1123456456785252
                  and we will be happy to assist you. We are available from 11
                  am to 10.00 pm on all days of the week However, an order can
                  be cancelled only before the product(s) has been shipped out
                  of the warehouse, which is generally within 2-4 hours of
                  placing the order.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseEighteen"
                  >
                    I am not interested in receiving any communication. What
                    will I need to do?
                  </a>
                </h4>
              </div>
              <div id="collapseEighteen" class="panel-collapse collapse">
                <div class="card-block">
                  We respect your need for privacy. Please click on the
                  unsubscribe link embedded in our online communication to
                  unsubscribe yourself. If the problem persists, just give us a
                  call at 1123456456785252 or email us at (((( email )))) and we
                  will take care of it.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseNineteen"
                  >
                    What are the working hours of your customer service?
                  </a>
                </h4>
              </div>
              <div id="collapseNineteen" class="panel-collapse collapse">
                <div class="card-block">
                  Our office hours are from 11 am to 10:00 pm on all days of the
                  week. You can also reach us at (((( email )))) and we assure
                  you of a response within 2 business days.
                </div>
              </div>
            </div>

            <div class="card ">
              <div class="card-header">
                <h4 class="card-header">
                  <a
                    class="accordion-toggle collapsed"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseTwenty"
                  >
                    Do you have a loyalty programme?
                  </a>
                </h4>
              </div>
              <div id="collapseTwenty" class="panel-collapse collapse">
                <div class="card-block">
                  Currently, we do not have a loyalty programme on our website
                  but we are working on it.
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
