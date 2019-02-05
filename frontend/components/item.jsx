import React, {
  Component
} from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Title from "./styles/Title";
import ItemStyles from "./styles/ItemStyles";
import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired
  };

  render() {
    const {
      item
    } = this.props;
    return ( <
      ItemStyles >
      <
      Title >
      <
      Link href = {
        {
          pathname: "/item",
          query: {
            id: item.id
          }
        }
      } >
      <
      a > {
        item.title
      } < /a> <
      /Link> <
      /Title> <
      PriceTag > {
        formatMoney(item.price)
      } < /PriceTag> <
      p > {
        item.description
      } < /p>

      <
      dv className = "buttonList" >
      <
      Link >
      <
      a > Edit < /a> <
      /Link> <
      /dv> <
      /ItemStyles>
    );
  }
}
