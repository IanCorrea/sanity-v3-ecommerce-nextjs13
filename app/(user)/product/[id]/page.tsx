import React from 'react';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import Product from '@/components/Product';


type Props = {
  params: {
    id: string;
  }
}

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`
  *[_type=='product'] {
    _id
  }
  `

  const products = await client.fetch(query);
  const productRoutes = products.map((product: Product) => product._id);

  return productRoutes.map((id: any) => ({
    id,
  }));
}

async function ProductPage({ params: { id } }: Props) {
  const query = groq`
  *[_type=='product' && _id == $id] {
    ...,
    store {
      ...,
      variants[]->
    }
  } | order(_createdAt desc)
  `
  const product = (await client.fetch(query, { id }))[0];

  return (
   <Product product={product} />
  )
}

export default ProductPage;