import React from "react";
import PropTypes from "prop-types";
import { HeaderSectionStyle } from './style';

function HeaderSection(props) {
  const { content } = props;
  return <HeaderSectionStyle>{content}</HeaderSectionStyle>;
}

HeaderSection.propTypes = {
  content: PropTypes.string.isRequired,
};

export default React.memo(HeaderSection);
