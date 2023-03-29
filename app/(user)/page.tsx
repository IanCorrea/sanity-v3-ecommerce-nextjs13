import { previewData } from 'next/headers';
import { client } from '@/lib/sanity.client';
import PreviewSuspense from '@/components/PreviewSuspense';

import PreviewHomeList from '@/components/PreviewHomeList';
import  Home from '@/components/Home';
import { groq } from 'next-sanity';

const query = groq`
*[_type=='home'] {
  ...,
  hero {
    ...,
    content[] {
      ...,
      product->
    }
  },
  modules[] {
    ...,
  }
} | order(_createdAt desc)
`
export const revalidate = 30;

export default async function Page() {
  if(previewData()) {
    return (
      <PreviewSuspense
        fallback={(
          <div role="status">
            <p className='text-center text-lg animate-pulse text-[#a121ef]'>
              Loading Preview Data...
            </p>
          </div>        
        )}>
        <PreviewHomeList query={query} />
      </PreviewSuspense>
    );
  }

  const home = (await client.fetch(query))[0];

  return (
    <Home data={home} />
  )
}