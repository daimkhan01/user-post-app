import React from "react";
import { CSSTransition } from "react-transition-group";
import "./TransitionWrapper.css";

const TransitionWrapper = ({ children, in: inProp }) => (
  <CSSTransition in={inProp} timeout={300} classNames="fade" unmountOnExit>
    <div>{children}</div>
  </CSSTransition>
);

export default TransitionWrapper;
