"use client"

import ProductList from "./ProductList";
import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { client } from '@/lib/sanity.client';
import { groq } from 'next-sanity';
import { useEffect } from 'react';
import Image from "next/image";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  data: Home;
}

const queryAutoCompleteProduct = groq`
*[_type == "product" && (store.title match ("*" + $query + "*")) || 
  (store.tags match ("*" + $query + "*")) ||
 (store.productType match ("*" + $query + "*"))] | order(_createdAt asc) {
  ...,
}[0...10] | order(_createdAt desc)

`

function Home({ data }: Props) {
  const { hero, hero: { content }, modules } = data;
  const productsRecommended = content.map((obj: any) => obj.product);

  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [query, setQuery] = useState('')
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    if(query.length < 1) return
    async function fetchData() {
      const listProducts = (await client.fetch(queryAutoCompleteProduct, { query }));
      setFilteredProducts(listProducts)
    }
    fetchData();
  }, [query]);

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            { hero.title }
            </h1>
            <div>
              {modules.map(mdl => (
                <p className="mt-6 text-lg leading-8 text-gray-600" key={mdl._key}>{mdl.text}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <svg
            className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset={1} stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>     

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 flex justify-center">Everything you need!</h2>
        <figure className="mt-5">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “Find the product you want! give a try ;)”
            </p>
          </blockquote>
          <div className="flex justify-center mt-5">
            <div className="relative inline-block text-center w-6/12">
              <Combobox value={selectedProduct} onChange={setSelectedProduct}>
                <Combobox.Input className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-lg text-gray-900 shadow-sm ring-1 ring-inset ring-purple-300 hover:bg-purple-300" 
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(product: Product) => product.store.title}
                placeholder="searching by name, tag or category"
                />
                <Combobox.Options className="bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filteredProducts.map((product) => (
                    <Combobox.Option className="text-lg bg-white text-gray-900 hover:bg-purple-300" key={product._id} value={product}>
                      {product.store.title} - {product.store.tags} - {product.store.productType}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </div>
          </div>            
        </figure>        
      </div>
      
      <div className="flex justify-center mt-5">        
        {        
          selectedProduct &&
            <div className="h-48 w-48 flex-shrink-0 rounded-md border border-gray-200">
            <ClientSideRoute key={selectedProduct._id} route={`/product/${selectedProduct._id}`}>
              <Image
                src={selectedProduct.store.previewImageUrl}
                alt={selectedProduct.store.title}
                width={80}
                height={80}
                className="h-full w-full object-cover object-center"
              />

              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>            
                  {selectedProduct.store.title}            
                </h3>
                <p>${selectedProduct.store.priceRange.minVariantPrice}</p>
              </div>
            </ClientSideRoute>
          </div>
        }       
      </div>
      <ProductList products={productsRecommended} /> 
    </div>    
  )
}

export default Home