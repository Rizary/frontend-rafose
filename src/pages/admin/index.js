import { Box, Grid, GridItem } from '@chakra-ui/react'
import { useState } from 'react'
import AdminLayout from '~/components/layout/admin'
import AllUnitsContent from '~/components/pages/admin/all-units'
import { useIsMounted } from '~/hooks/useIsMounted'

export default function AdminAllUnits() {
  const [allAttrLoaded, setAllAttrLoaded] = useState(false)
  const isMounted = useIsMounted()
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={{ base: '4', lg: '8' }}
        mx="auto"
      >
        <GridItem colSpan={4}>
          <Box bg="rgba(146, 210, 183, 0.2)" borderRadius="md" p="4">
            <AllUnitsContent
              allAttrLoaded={allAttrLoaded}
              setAllAttrLoaded={setAllAttrLoaded}
            />
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

AdminAllUnits.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>
}
