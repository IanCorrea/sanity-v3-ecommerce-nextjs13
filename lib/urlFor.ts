import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client';

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default urlFor;