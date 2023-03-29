"use client"

import { usePreview } from '@/lib/sanity.preview';
import Home from './Home';

type Props = {
  query: string;
}

export default function PreviewHomeList({ query }: Props) {
  const home = usePreview(null, query)[0];
  return <Home data={home} />
}