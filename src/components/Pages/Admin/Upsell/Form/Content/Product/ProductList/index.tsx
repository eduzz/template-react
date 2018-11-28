import React, { PureComponent, Fragment } from 'react';
import { IProduct } from 'interfaces/models/product';
import ProductItem from './ProductItem';
import List from '@material-ui/core/List';

export default class ProductList extends PureComponent {
  private products: IProduct[] = [
    {
      id: 1,
      title: '09987 - Design Sprint Google Ventures',
      image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
      price: 46,
      content: 'a',
      variants: [
        {
          id: 1,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
          price: 46,
          content: 'aa',
        },
        {
          id: 2,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
          price: 46,
          content: 'ab',
        },
        {
          id: 3,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
          price: 46,
          content: 'ac',
        },
      ],
    },
    {
      id: 2,
      title: '09987 - Design Sprint Google Ventures',
      image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
      price: 46,
      content: 'b',
    },
    {
      id: 3,
      title: '09987 - Pacote de cursos 12 houses',
      image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
      price: 46,
      content: 'c',
      variants: [
        {
          id: 1,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/1.png',
          price: 46,
          content: 'ca',
        },
        {
          id: 2,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/2.png',
          price: 46,
          content: 'cb',
        },
        {
          id: 3,
          title: 'Design Sprint Promoção para Assinantes',
          image: 'http://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/3.png',
          price: 46,
          content: 'cc',
        },
      ],
    },
  ];

  render() {
    return (
      <Fragment>
        <List disablePadding>
          {this.products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
            />
          ))}
        </List>
      </Fragment>
    );
  }
}