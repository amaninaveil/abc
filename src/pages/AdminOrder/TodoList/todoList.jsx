import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Col, Input, Row } from "reactstrap";
import OrderApi from "../../../api/orderApi";
import { AdminOrderUrl } from "../../../pages/AdminOrder/adminOrderType";
import { OrderStatus } from "../../../pages/Order/type";
import { updateOrderPeriod } from "../../../utilities/slices/adminOrderSlice";
import { showFailedMessage } from "../../../utilities/slices/notificationSlice";
import { AdminOrderTypeLabel } from "../adminOrderType";
import TodoTable from "./TodoTable/todoTable";
import "./_todoList.scss";

function TodoList(props) {
  const [allOrders, setAllOrders] = useState();
  const [orders, setOrders] = useState();
  const [content, setContent] = useState("Refresh All");

  const orderPeriod = useSelector((state) => state.adminOrder.orderPeriod);

  const dispatch = useDispatch();

  const tabName = useLocation().pathname.replace("/admin/order/", "");

  const classifyAdminOrders = (listOrders) => {
    let filterResults = {
      [AdminOrderUrl.PENDING_CONFIRM]: [],
      [AdminOrderUrl.IN_HANDLING]: [],
      [AdminOrderUrl.SHIPPED]: [],
      [AdminOrderUrl.COMPLETED]: [],
      [AdminOrderUrl.CANCELLED]: [],
    };
    listOrders.forEach((order) => {
      switch (order.status) {
        case OrderStatus.PLACED_ORDER:
          filterResults[AdminOrderUrl.PENDING_CONFIRM].push(order);
          break;
        case OrderStatus.IN_HANDLING:
          filterResults[AdminOrderUrl.IN_HANDLING].push(order);
          break;
        case OrderStatus.DELIVERIED:
          filterResults[AdminOrderUrl.COMPLETED].push(order);
          break;
        case OrderStatus.SHIPPED:
          filterResults[AdminOrderUrl.SHIPPED].push(order);
          break;
        case OrderStatus.CANCELLED:
          filterResults[AdminOrderUrl.CANCELLED].push(order);
          break;
        default:
          break;
      }
    });
    return filterResults;
  };

  const fetchAllAdminOrders = async () => {
    if (content === "Refresh All") {
      const parseDateTime = orderPeriod.split("-");
      setContent("Refreshing");
      OrderApi.getAllAdminOrders({
        month: parseDateTime[1],
        year: parseDateTime[0],
      })
        .then((response) => {
          const filterOrders = classifyAdminOrders(response);

          setAllOrders(filterOrders);
          alert();
        })
        .catch((e) => {
          dispatch(dispatch(showFailedMessage()));
        });
    }
  };

  let timer = null;

  const alert = () => {
    window.clearTimeout(timer);
    setContent("Refreshed!");
    timer = window.setTimeout(function () {
      setContent("Refresh All");
    }, 600);
  };

  useEffect(() => {
    if (orderPeriod) {
      fetchAllAdminOrders(orderPeriod);
    }
  }, [orderPeriod]);

  useEffect(() => {
    if (allOrders) {
      setOrders(allOrders[tabName]);
    }
  }, [tabName, allOrders]);

  const renderToDoList = () => {
    let result = [];
    Object.entries(allOrders).forEach(([orderStatus, listOrders]) => {
      result.push(
        <Col xs="6" sm="4" className="p-3" key={orderStatus}>
          <NavLink
            to={`/admin/order/${orderStatus}`}
            activeClassName="active"
            className="task-container"
            // onClick={() => setOrders(listOrders)}
          >
            <div className="quantity">{listOrders.length}</div>
            <div className="name pb-1">{AdminOrderTypeLabel[orderStatus]}</div>
          </NavLink>
        </Col>
      );
    });
    return result;
  };
  return (
    <>
      <div className="todo-list p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h4>To Do List</h4>
          <button
            className="btn btn-refresh"
            onClick={() => fetchAllAdminOrders(orderPeriod)}
          >
            <i className="fas fa-sync-alt mr-2"></i>
            {content}
          </button>
        </div>
        <p>You have to handle these orders as soon as possible</p>
        <Input
          type="month"
          name="month"
          min="2020-01"
          defaultValue={orderPeriod}
          onChange={(e) => {
            dispatch(updateOrderPeriod(e.target.value));
          }}
          onKeyDown={() => false}
        />

        <div className="container-fluid">
          <Row className="text-center">{allOrders && renderToDoList()}</Row>
        </div>
      </div>
      {orders && <TodoTable orders={orders} />}
    </>
  );
}

TodoList.propTypes = {};

export default React.memo(TodoList);
