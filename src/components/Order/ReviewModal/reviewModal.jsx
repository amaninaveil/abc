import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import { useHistory } from "react-router-dom";
import { Spinner } from "reactstrap";
import ReviewApi from "../../../api/reviewApi";
import starIcon from "../../../assets/images/review.jpeg";
import parseImages from "../../../helpers/parseImages";
import "./_reviewModal.scss";
import OrderApi from "../../../api/orderApi";
import formatFullyDate from "../../../helpers/formatFullyDateTime";
import { showFailedMessage } from "../../../utilities/slices/notificationSlice";
import { getAllUserOrders } from "../../../utilities/slices/userSlice";
import { useDispatch } from "react-redux";
import noimage from "../../../assets/images/noimage.png";

function ReviewModal(props) {
  const { order, orderId } = props;
  const history = useHistory();

  const [isReviewed, setIsReviewed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const rate = (rate, productID) => {
    if (alert && alert[productID]) {
      const newAlert = { ...alert };
      delete newAlert[productID];
      setAlert(newAlert);
    }
    let stars = document
      .getElementById(`rating-${productID}`)
      .querySelectorAll("svg");
    for (let index = 4; index >= 0; index--) {
      if (index >= rate)
        stars[index]
          .querySelector("path")
          .setAttribute("fill", " var(--review-star-background)");
      else stars[index].querySelector("path").setAttribute("fill", "none");
    }
    const listReview = reviews;
    for (let i = 0; i < listReview.length; i++) {
      if (listReview[i].productID === productID) {
        listReview[i].rate = 5 - rate;
        setReviews([...listReview]);
        return;
      }
    }

    listReview.push({
      rate: 5 - rate,
      productID,
    });

    setReviews([...listReview]);
  };

  const updateReview = (review, productID) => {
    const listReview = reviews;
    for (let i = 0; i < listReview.length; i++) {
      if (listReview[i].productID === productID) {
        listReview[i].reviewContent = review;
        setReviews([...listReview]);
        return;
      }
    }
    listReview.push({
      reviewContent: review,
      productID,
    });
    setReviews([...listReview]);
  };

  const checkValidReview = (review, productID) => {
    const listReview = reviews;
    for (let i = 0; i < listReview.length; i++) {
      if (listReview[i].productID === productID) {
        if (review && !listReview[i].rate) {
          setAlert({
            ...alert,
            [productID]: true,
          });
        } else {
          const newAlert = { ...alert };
          delete newAlert[productID];
          setAlert(newAlert);
        }
        return;
      }
    }
  };

  const renderStarRating = (productID, reviewInfo) => {
    let result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          onClick={reviewInfo.isReviewed ? null : () => rate(i, productID)}
        >
          <path
            className={`${!rate ? "unrate-star" : ""}`}
            fill={
              reviewInfo.rate > i ? "var(--review-star-background)" : "none"
            }
            fillRule="evenodd"
            stroke="var(--review-star-border)"
            strokeWidth="1.5"
            d="M16 1.695l-4.204 8.518-9.401 1.366 6.802 6.631-1.605 9.363L16 23.153l8.408 4.42-1.605-9.363 6.802-6.63-9.4-1.367L16 1.695z"
          ></path>
        </svg>
      );
    }
    return result;
  };

  const renderAReview = (product) => {
    const images = parseImages(product.images);
    const reviewInfo = {
      content: product.reviewContent,
      rate: product.rate,
      isReviewed: product.reviewed,
    };
    return (
      <Media className="p-3 product-review">
        <img
          alt=""
          className="mr-3"
          src={images.length > 0 ? images[0] : noimage}
        />
        <Media.Body className="d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between">
            <div>
              <b>{product.name}</b>
            </div>
            <div
              className={`rate-star${product.reviewed ? " rated" : " unrated"}`}
              id={`rating-${product.id}`}
            >
              {renderStarRating(product.id, reviewInfo)}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="provided-tag">
                <small>
                  Provided by <span>TechShop</span>
                </small>
              </div>
              {alert && alert[product.id] ? (
                <div className="text-danger">
                  <small>Please add rating for {product.name}</small>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              {reviewInfo.isReviewed ? (
                <div className="reviewed-tag">
                  <i className="fas fa-check-circle"></i> Reviewed
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {product.reviewed ? (
            product.reviewContent ? (
              <div className="mt-1 d-flex align-items-center">
                <div className="review-content">{product.reviewContent}</div>
                <div className="review-time ml-3">
                  {formatFullyDate(product.reviewDate)}
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            <textarea
              rows="1"
              placeholder="Your review"
              onChange={(e) => {
                updateReview(e.target.value, product.id);
              }}
              onBlur={(e) => {
                checkValidReview(e.target.value, product.id);
              }}
            ></textarea>
          )}
        </Media.Body>
      </Media>
    );
  };

  const submitReview = () => {
    // call api post review
    // id, orderID, review Content, rate
    const addReview = async (data) => {
      setLoading(true);
      return ReviewApi.addReview(data)
        .then((res) => {
          // setLoading(false);
          // setIsReviewed(true);
        })
        .catch((err) => {
          dispatch(showFailedMessage());
          return;
        });
    };
    let body = reviews
      .filter((review) => review.rate)
      .map((review) => {
        return {
          ...review,
          orderID: orderId,
        };
      });
    addReview(body).then(() => {
      let ratedProduct = order.detailedInvoices.find(
        (invoice) => invoice.reviewed
      );
      if (!ratedProduct) {
        OrderApi.updateOrderStatus(orderId).then(() => {
          setLoading(false);
          setIsReviewed(true);
        });
      } else {
        setLoading(false);
        setIsReviewed(true);
      }
    });
  };

  const renderReviewBtn = () => {
    let unratedProduct = order.detailedInvoices.filter(
      (invoice) => !invoice.reviewed
    );
    if (unratedProduct.length === 0) {
      return (
        <div className="feedback">Thank you for your valuable feedbacks</div>
      );
    }
    if (loading) {
      return (
        <div className="text-center loading-review">
          <Spinner color="primary" />
        </div>
      );
    }
    let emptyRating = reviews.filter((review) => review.rate);
    return (
      <div className="btn-review">
        <button
          disabled={
            (alert && Object.keys(alert).length !== 0) ||
            emptyRating.length === 0
              ? true
              : false
          }
          onClick={submitReview}
        >
          Submit your review
        </button>
      </div>
    );
  };

  const closeModal = () => {
    dispatch(getAllUserOrders());
    history.push("/your-orders/deliveried");
  };

  const renderReviewArea = () => {
    return isReviewed ? (
      <div className="modal-body reviewed-modal-body">
        <img src={starIcon} alt="" srcSet="" />
        <div className="response">
          <div className="thank-you">Thank you for your valuable review!</div>
          <div>
            We really appreciate you taking the time to share your rating with
            us. We look forward to seeing you again soon
          </div>
        </div>
        <button data-dismiss="modal" onClick={closeModal}>
          OK
        </button>
      </div>
    ) : (
      <React.Fragment>
        <div className="modal-header">
          <h5>Review your experience</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body review-modal-body p-0">
          {order.detailedInvoices.map((product) => (
            <React.Fragment key={product.id}>
              {renderAReview(product)}
            </React.Fragment>
          ))}
        </div>

        <div className="modal-footer">{renderReviewBtn()}</div>
      </React.Fragment>
    );
  };

  return (
    <div
      className="modal fade"
      id="reviewModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div
        className="reviewModal modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">{renderReviewArea()}</div>
      </div>
    </div>
  );
}

ReviewModal.propTypes = {};
ReviewModal.defaultProps = {};

export default React.memo(ReviewModal);
