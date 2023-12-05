import { Box, Grid, GridItem, Select, Skeleton, Text } from '@chakra-ui/react'
import { NFTCard } from '~/components/card'
import Pagination from '~/components/pagination'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useIsMounted } from '~/hooks/useIsMounted'
import { ipfsDetailsLoader } from '~/utils/loader'
import { LoadingLayer } from '~/utils/loading-layer'
import { range } from '~/utils/range'
import DetailsModal from './details-modal'

export default function AllUnitsContent({ allAttrLoaded, setAllAttrLoaded }) {
  const [page, setPage] = useState(0)
  const isMounted = useIsMounted
  const [data, setData] = useState([])
  const [sort, setSort] = useState(null)
  const onPageChange = ({ selected }) => {
    setPage(selected)
  }

  const onSort = (value) => {
    setSort(value)
  }

  useEffect(() => {
    async function getNFTs() {
      // Define the range start
      const rangeStart = () => {
        return page * 50 + 1
      }
      // Define the range end
      const rangeEnd = () => {
        return page * 50 + 50 > 10001 ? 10001 : page * 50 + 52
      }
      // Create range
      const nftIds = range(rangeStart(), rangeEnd())
      // Get data based on range
      setAllAttrLoaded(false)
      setData([])
      const fetchedData = []
      await Promise.all(
        nftIds.map(async (id) => {
          try {
            const response = await fetch(ipfsDetailsLoader(id))
            const newData = await response.json()
            fetchedData.push(newData)
          } catch (error) {
            console.error('Error fetching data:', error)
          }
        })
      )
      setData(fetchedData.sort((a, b) => a.edition - b.edition))
      setAllAttrLoaded(true)
    }

    getNFTs()
  }, [page, sort, setAllAttrLoaded])

  return (
    <Box>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        <GridItem colSpan={6}>
          <Text fontSize="2xl" fontWeight="bold" color="#363755">
            All Units
          </Text>
        </GridItem>
        <GridItem colSpan={6}>
          <Select
            defaultValue={sort}
            onChange={({ target }) => onSort(target.value)}
          >
            <option value="null">Order by</option>
            <option value="avail_desc">Availability Ascending</option>
            <option value="avail_desc">Availability Descending</option>
          </Select>
        </GridItem>
      </Grid>
      {!allAttrLoaded && (
        <Box bgColor="white">
          <LoadingLayer />
        </Box>
      )}
      <Box display={!allAttrLoaded ? 'none' : 'block'}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {!allAttrLoaded
            ? range(0, 36).map((id) => <Skeleton key={id} minHeight="320px" />)
            : data.map((nft, index) => (
                <NFTCardItem index={index} nft={nft} key={index} />
              ))}
        </Grid>
      </Box>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        <Pagination
          initialPage={page}
          onPageChange={onPageChange}
          pageRangeDisplayed={3}
          pageCount={Math.ceil(10000 / 50)}
        />
      </Grid>
    </Box>
  )
}

const NFTCardItem = ({ index, nft }) => {
  const { isConnected } = useAccount()
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isErrorOpened, setIsErrorOpened] = useState(true)
  const { edition, name, attributes } = nft

  return (
    <>
      <NFTCard
        key={edition}
        src={`${edition}.png`}
        title={name}
        setIsModalOpened={setIsModalOpened}
      />

      {isModalOpened && (
        <DetailsModal
          isOpen={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          edition={edition}
          attributes={attributes}
          isErrorOpen={isErrorOpened}
          onErrorOpen={setIsErrorOpened}
          onErrorClose={() => setIsErrorOpened(false)}
          name={name}
          isConnected={isConnected}
        />
      )}
    </>
  )
}
