import React from "react";
import { Div } from "glamorous";
import colours from "../../constants/Colours";
import "../../css/timeline.css";
import TimelineDate from "./TimelineDate";
import Responsive from "../Responsive";

class TimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDates: false,
      active: false,
      showStems: false
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ showStems: true, showDates: true }), 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && !this.props.active) {
      this.shrinkItem();
    }
  }

  growItem = () => this.setState({ active: true });

  shrinkItem = () => {
    if (this.props.active) {
      return;
    }

    this.setState({ active: false });
  };

  setActive = () => {
    this.growItem();
    this.props.toggleSummary(this.props.item);
  };

  render() {
    const { active } = this.state;
    const { isMobile } = this.props;
    return (
      <Div
        className="timeline-item"
        position="relative"
        onClick={this.setActive}
        width={80}
        onMouseOver={this.growItem}
        onMouseLeave={this.shrinkItem}
        onFocus={this.growItem}
        onBlur={this.shrinkItem}
        height={80}
        borderRadius="50%"
        cursor="pointer"
        left={active && isMobile ? 20 : 0}
        backgroundColor={colours.white}
        border={`3px solid ${active ? colours.purple : colours.header}`}
        backgroundImage={`url(${this.props.image})`}
        backgroundRepeat="no-repeat"
        transition="all .5s ease"
        opacity={active ? 1 : 0.6}
        bottom={active || isMobile ? 60 : 50}
        {...this.props.style}
      >
        <Responsive.NotMobile>
          <Div
            id="1"
            width={2}
            transition="all .5s ease"
            backgroundColor={colours.header}
            position="absolute"
            left="50%"
            height={active || isMobile ? 20 : 10}
            bottom={active || isMobile ? -20 : -10}
            display={this.state.showStems ? "block" : "none"}
          />
        </Responsive.NotMobile>

        <TimelineDate
          show={!active && this.state.showDates}
          fromDate={this.props.fromDate}
          toDate={this.props.toDate}
          isMobile={isMobile}
        />
      </Div>
    );
  }
}

export default TimelineItem;
