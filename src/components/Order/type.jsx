export const MESSAGE_ORDER = {
  RECEIVED_QUESTION: "Do you receive your package successfully?",
  SHIPPED_QUESTION: "Does the shipper ship package successfully?",
  SUCCESSFUL_REQUEST: "Successful action",
  CANCEL_ORDER: "Are you sure that you want to cancel this order?",
  SUBMIT_SHIPPER_INFO: "Shipper's Information",
  SUBMIT_SHIPPER_INFO_SUCCESS: "Successful update"
};

export const REASON_CANCEL_ORDER = [
  {
    name: "DELAY_DELIVERIED",
    reason: "Product is taking too long to be delivered",
  },
  {
    name: "CHANGE_OPTION",
    reason: "I change my mind and opt for another brand instead",
  },
  {
    name: "CASH_UNAVAIABLE",
    reason: "Cash not available for COD",
  },
  {
    name: "OTHER_SHOP",
    reason:
      "I got the same product on another website at a lower price than the order price",
  },
  {
    name: "OTHER_REASON",
  },
];
