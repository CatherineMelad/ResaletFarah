import PagesHeader from '@/components/shared/pages-header'
import React from 'react'
import DirectorsCards from './_components/directors-cards'

export default function Directors() {
  return (
    <>
      <PagesHeader title={"Our Directors"}/>
      <DirectorsCards/>
    </>
  )
}
