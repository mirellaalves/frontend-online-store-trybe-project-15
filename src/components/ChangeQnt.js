import React from 'react';
import './ChangeQnt.css';

class ChangeQnt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qnt: this.props.qnt,
      price: this.props.price,
    };
    this.reduceQnt = this.reduceQnt.bind(this);
    this.increaseQnt = this.increaseQnt.bind(this);
    this.changePrice = this.changePrice.bind(this);
  }

  componentDidMount() {
    const { onChange } = this.props;
    const { price } = this.state;
    if (onChange) {
      onChange(price);
    }
  }

  changePrice() {
    const { price } = this.props;
    this.setState((state) => ({ price: price * state.qnt }));
  }

  reduceQnt() {
    const { onChange, price } = this.props;
    const { qnt } = this.state;
    if (qnt > 1) {
      this.setState((state) => ({ qnt: state.qnt - 1 }));
      this.changePrice();
      onChange(-price);
    }
  }

  increaseQnt() {
    const { qnt } = this.state;
    const { max, onChange, price } = this.props;
    console.log(qnt);
    if (qnt < max) {
      this.setState((state) => ({ qnt: state.qnt + 1 }));
      this.changePrice();
      onChange(price, qnt);
    }
  }

  render() {
    const { qnt, price } = this.state;
    console.log(qnt);
    return (
      <div className="qntPriceComp">
        <div className="changeQtnComp">
          <button data-testid="product-decrease-quantity" onClick={this.reduceQnt}> - </button>
          <p data-testid="shopping-cart-product-quantity">{qnt}</p>
          <button data-testid="product-increase-quantity" onClick={this.increaseQnt}> + </button>
        </div>
        <div>
          <p>{`R$${price.toFixed(2)}`}</p>
        </div>
      </div>
    );
  }
}

export default ChangeQnt;
