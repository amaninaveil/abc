import { OrderStatus } from "../pages/Order/type";

export const classifyOrder = (listOrders) => {
  let filterResults = {
    "placed-order": [],
    handling: [],
    deliveried: [],
    shipped: [],
    cancelled: [],
  };
  listOrders.forEach((order) => {
    switch (order.status) {
      case OrderStatus.PLACED_ORDER:
        filterResults["placed-order"].push(order);
        break;
      case OrderStatus.IN_HANDLING:
        filterResults["handling"].push(order);
        break;
      case OrderStatus.DELIVERIED:
        filterResults["deliveried"].push(order);
        break;
      case OrderStatus.SHIPPED:
        filterResults["shipped"].push(order);
        break;
      case OrderStatus.CANCELLED:
        filterResults["cancelled"].push(order);
        break;
      default:
        break;
    }
  });
  return filterResults;
};
