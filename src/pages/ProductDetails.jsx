import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.css';
import Quantity from '../components/productDetails/Quantity';
import ProductReview from '../components/productDetails/ProductReview';
import CartIconQnt from '../components/homePage/CartIconQnt';
import cartIcon from '../images/cart-icon.png';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      counter: 1,
      session: [],
    };
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onIncrement() {
    const { available_quantity: availableQuantity } = this.props.location.details.product;
    this.setState((state) => ({ counter: Math.min(state.counter + 1, availableQuantity) }));
  }

  onDecrement() {
    this.setState((state) => ({ counter: Math.max(state.counter - 1, 1) }));
  }

  // handleClick(product, qnt) {
  //   const { session } = this.state;
  //   const toAdd = {
  //     product,
  //     qnt,
  //   };
  //   this.setState((state) => ({ session: [...state.session, toAdd] }));
  //   localStorage.setItem('cart', JSON.stringify([...session, toAdd]));
  // }

  handleChange(opp) {
    if (opp) {
      this.onIncrement();
    } else {
      this.onDecrement();
    }
  }

  freeShippingLabel() {
    const { shipping } = this.props.location.details.product;
    if (shipping.free_shipping) {
      return (
        <span data-testid="free-shipping">Free Shipping!</span>
      );
    }
    return (
      <span />
    );
  }

  productH1Name() {
    const { title, price } = this.props.location.details.product;
    return (
      <div className="product-details-h1-name">
        <h1 data-testid="product-detail-name">{title}</h1>
        <h2>{`R$ ${Number(price).toFixed(2)}`}</h2>
        {this.freeShippingLabel()}
      </div>
    );
  }

  productPhoto() {
    const { title, thumbnail } = this.props.location.details.product;
    return (
      <div className="product-details-left">
        <img src={thumbnail} alt={`Foto do ${title}`} />
      </div>
    );
  }

  render() {
    const { attributes } = this.props.location.details.product;
    const { product, counter } = this.state;
    const { func } = this.props.location;
    return (
      <div>
        <Link to="/cart">
          <img
            data-testid="shopping-cart-button"
            src={cartIcon}
            className="cart-icon"
            alt="Icon of a Cart"
          />
        </Link>
        <CartIconQnt />
        <div className="product-details-page-container">
          {this.productH1Name()}
          <div className="produc-details-contents">
            {this.productPhoto()}
            <div className="product-details-right">
              <h3>Especificações Técnicas</h3>
              <ul>
                {attributes.map((e) => (<li key={e.id}>{`${e.name}: ${e.value_name}`}</li>))}
              </ul>
            </div>
          </div>
          <Quantity prodQnt={this.handleChange} counter={counter} />
          <Link
            to={{ pathname: '/cart', details: { product, qnt: counter } }}
          >
            <button
              type="button"
              onClick={() => func(this.props.location.details.product, counter)}
              data-testid="product-detail-add-to-cart"
            >
              Adicionar ao Carrinho
            </button>
          </Link>
          <ProductReview />
        </div>
      </div>
    );
  }
}

export default ProductDetails;
