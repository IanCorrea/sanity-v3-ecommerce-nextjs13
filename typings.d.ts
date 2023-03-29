type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

interface Home extends Base {
  hero: Hero;
  modules: Modules[];
  seo: Seo;  
}

interface Hero {
  _type: string;
  title: string;
  content: Content[];
}

interface Content {
  _type: string;
  type: string;
  product: Product;
}

interface Product {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  store: Store;
}

interface Store {
  createdAt: string;
  descriptionHtml: string;
  gid: string;
  id: string;
  isDeleted: boolean;
  options: array;
  previewImageUrl: string;
  priceRange: PriceRange;
  productType: string;
  slug: object
  status: boolean;
  tags: string;
  title: string;
  variants: Variants[];
  vendor: string;
}

interface PriceRange {
  minVariantPrice: string;
}

interface Variants {
  store: {
    option1: string;
  };
}

interface Modules {
  _key: string;
  _type: string;
  text: string;
}

interface Seo {
  _type: string;
  description: string;
  title: string;
}