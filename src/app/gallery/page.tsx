import PagesHeader from '@/components/shared/pages-header'
import React from 'react'
import GalleryFolders from './_components/gallery-folders'

export default function Gallery() {
  return (
    <>
      <PagesHeader title={"Our Gallery"}/>
      <GalleryFolders/>
    </>
  )
}
