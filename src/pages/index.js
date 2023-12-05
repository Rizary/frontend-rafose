import { LandingLayout } from '~/components/layout'

import {
  AboutSection,
  CommunitySection,
  FeaturedCollectionSection,
  HeroSection,
  RoadMapSection,
  TeamSection,
} from '~/components/pages/index'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedCollectionSection />
      <AboutSection />
      <TeamSection />
      <RoadMapSection />
      <CommunitySection />
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>
}
