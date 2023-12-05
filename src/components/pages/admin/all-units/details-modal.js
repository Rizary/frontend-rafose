import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Image,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { UnitsModal } from '~/components/modal'

import { hexZeroPad, id } from 'ethers/lib/utils.js'
import { useEffect, useState } from 'react'
import { useContract, useContractRead, useProvider } from 'wagmi'
import RAFOSEABI from '~/contracts/RAFOSE.json'
import { useIsMounted } from '~/hooks/useIsMounted'
import { RAFOSE, truncate } from '~/utils/contract-address'
import { ipfsImageLoader } from '~/utils/loader'

export default function DetailsModal({
  isOpen,
  onClose,
  isErrorOpen,
  onErrorOpen,
  onErrorClose,
  edition,
  attributes,
  name,
  isConnected,
}) {
  const isMounted = useIsMounted()
  const provider = useProvider()
  const contract = useContract({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    signerOrProvider: provider,
  })
  const { data: currentOwnership } = useContractRead({
    address: RAFOSE,
    abi: RAFOSEABI.abi,
    enabled: !!isConnected && isOpen,
    watch: true,
    functionName: 'explicitOwnershipOf',
    args: [edition],
  })

  const [tokenOwnership, setTokenOwnership] = useState({})
  useEffect(() => {
    const getTokenOwnership = async () => {
      const pc = await currentOwnership
      const tokenObject = pc && {
        address: pc['addr'],
        burned: `${pc['burned']}`,
        extraData: pc['extraData'],
        startTimestamp: pc['startTimestamp'].toNumber(),
      }

      isConnected && setTokenOwnership(tokenObject)
    }
    getTokenOwnership()
  }, [isConnected, currentOwnership])

  const eventSignature = id('Transfer(address,address,uint256)')
  const eventTopic = hexZeroPad(eventSignature, 32)

  const filter = {
    address: RAFOSE,
    fromBlock: '0x0', // Starting block number
    toBlock: 'latest', // Ending block number
    topics: [eventTopic, null, null, hexZeroPad(edition, 32)],
  }
  const [allTransferEvents, setAllTransferEvents] = useState([])
  useEffect(() => {
    const getPastEvents = async () => {
      //   const logs = await provider.getLogs(filter)
      //     const events = logs.map((log) => contract.interface.parseLog(log))
      const filter = contract.filters['Transfer'](null, null, edition)
      const events = await contract.queryFilter(filter)

      isConnected &&
        setAllTransferEvents(
          events.map((id) => ({
            from: id.args['from'],
            to: id.args['to'],
            tokenId: id.args['tokenId'],
            blockHash: id.blockHash,
            blockNumber: id.blockNumber,
            transactionHash: id.transactionHash,
            transactionIndex: id.transactionIndex,
          }))
        )
    }
    getPastEvents()
  }, [isConnected, contract, edition])

  return (
    <UnitsModal key={edition} isOpen={isOpen} onClose={onClose} title={edition}>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" textAlign={'center'}>
          RAFOSE #{edition}
        </Text>
        <Divider />
        <Grid templateColumns="1fr" gap={2} p={4} key={edition}>
          {/* Image */}
          <GridItem colSpan={1}>
            <Box
              h="full"
              w="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {edition && (
                <Image
                  src={ipfsImageLoader(`${edition}.png`)}
                  bgSize="cover"
                  bgPosition="bottom"
                  bgRepeat="no-repeat"
                  maxWidth={'60%'}
                  alt={name}
                  objectFit="contain"
                />
              )}
            </Box>
          </GridItem>
          {/* Ownership Details */}
          <GridItem colSpan={1}>
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              bg="#F3FAFC"
              p={4}
            >
              <Text fontWeight="bold">Ownership</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {isMounted &&
                  tokenOwnership &&
                  Object.entries(tokenOwnership).map(([key, value], index) => (
                    <Box
                      key={index}
                      mx="auto"
                      display="flex"
                      flexDirection="column"
                      w="full"
                      alignItems="start"
                      justifyContent="space-between"
                      borderRadius="xl"
                      bg="white"
                      p={3}
                      shadow="lg"
                    >
                      <Text
                        fontWeight="semibold"
                        color="#D5AA01"
                        fontSize={['md', 'xs']}
                        mb={2}
                      >
                        {key}
                      </Text>

                      <Box
                        display="flex"
                        alignItems="start"
                        justifyContent="start"
                        w="full"
                        h="full"
                        borderRadius="xl"
                        bg="white"
                        p={3}
                        shadow="lg"
                      >
                        {key === 'address' ? (
                          <Popover
                            closeOnBlur={false}
                            isLazy
                            lazyBehavior="keepMounted"
                          >
                            <HStack>
                              <PopoverAnchor>
                                <Text
                                  fontSize={['md', 'xs']}
                                  fontWeight="semibold"
                                  color="#363755"
                                >
                                  {truncate(value)}
                                </Text>
                              </PopoverAnchor>
                              <Spacer />
                              <PopoverTrigger>
                                <Button
                                  h="50%"
                                  bgColor="#D5AA01"
                                  color="white"
                                  fontSize={['xs']}
                                  fontWeight="semibold"
                                  minWidth="64px"
                                >
                                  Details
                                </Button>
                              </PopoverTrigger>
                            </HStack>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverBody>
                                <Text
                                  fontSize={['md', 'xs']}
                                  fontWeight="semibold"
                                  color="#363755"
                                  p={2}
                                >
                                  {value}
                                </Text>
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Text
                            fontSize={['md', 'xs']}
                            fontWeight="semibold"
                            color="#363755"
                          >
                            {value}
                          </Text>
                        )}
                      </Box>
                    </Box>
                  ))}
              </Grid>
            </Box>
          </GridItem>
          {/* Attributes */}
          <GridItem colSpan={1}>
            <Box
              display="flex"
              flexDirection="column"
              gap={4}
              bg="#F3FAFC"
              p={4}
            >
              <Text fontWeight="bold">Attributes</Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {attributes.map((item, index) => (
                  <Box
                    key={index}
                    mx="auto"
                    display="flex"
                    w="full"
                    alignItems="center"
                    justifyContent="space-between"
                    borderRadius="xl"
                    bg="white"
                    p={3}
                    shadow="lg"
                    flexDirection={['column', 'row']}
                  >
                    <Text
                      w="full"
                      fontWeight="semibold"
                      color="#E0E4EF"
                      fontSize={['md', 'xs']}
                    >
                      {item.trait_type}
                    </Text>

                    <Box display="flex" alignItems="center" gap={4}>
                      <Box
                        h={2}
                        w={2}
                        borderRadius="full"
                        bg="rgba(15,171,158,0.8)"
                      />
                      <Text
                        fontSize={['md', 'xs']}
                        fontWeight="semibold"
                        color="#363755"
                      >
                        {item.value}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Box>
          </GridItem>

          {/* Activity */}
          <GridItem colSpan={1}>
            <TableContainer>
              <Table variant="simple" size="sm">
                <Thead bgColor="#D5AA01">
                  <Tr>
                    <Th color="white">From</Th>
                    <Th color="white">To</Th>
                    <Th color="white">Block Hash</Th>
                    <Th color="white">Transaction Hash</Th>
                  </Tr>
                </Thead>
                {allTransferEvents.map((event, index) => (
                  <Tbody key={index}>
                    <Tr bgColor={index % 2 === 0 ? '#FFFAF5' : 'white'}>
                      <Td>
                        <Popover
                          closeOnBlur={false}
                          isLazy
                          lazyBehavior="keepMounted"
                        >
                          <HStack>
                            <PopoverAnchor>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                              >
                                {truncate(event.from)}
                              </Text>
                            </PopoverAnchor>
                            <Spacer />
                            <PopoverTrigger>
                              <Button
                                h="50%"
                                bgColor="#D5AA01"
                                color="white"
                                fontSize={['xs']}
                                fontWeight="semibold"
                                minWidth="64px"
                              >
                                Details
                              </Button>
                            </PopoverTrigger>
                          </HStack>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                                p={2}
                              >
                                {event.from}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>
                        <Popover
                          closeOnBlur={false}
                          isLazy
                          lazyBehavior="keepMounted"
                        >
                          <HStack>
                            <PopoverAnchor>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                              >
                                {truncate(event.to)}
                              </Text>
                            </PopoverAnchor>
                            <Spacer />
                            <PopoverTrigger>
                              <Button
                                h="50%"
                                bgColor="#D5AA01"
                                color="white"
                                fontSize={['xs']}
                                fontWeight="semibold"
                                minWidth="64px"
                              >
                                Details
                              </Button>
                            </PopoverTrigger>
                          </HStack>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                                p={2}
                              >
                                {event.to}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>
                        <Popover
                          closeOnBlur={false}
                          isLazy
                          lazyBehavior="keepMounted"
                        >
                          <HStack>
                            <PopoverAnchor>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                              >
                                {truncate(event.blockHash)}
                              </Text>
                            </PopoverAnchor>
                            <Spacer />
                            <PopoverTrigger>
                              <Button
                                h="50%"
                                bgColor="#D5AA01"
                                color="white"
                                fontSize={['xs']}
                                fontWeight="semibold"
                                minWidth="64px"
                              >
                                Details
                              </Button>
                            </PopoverTrigger>
                          </HStack>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                                p={2}
                              >
                                {event.blockHash}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                      <Td>
                        <Popover
                          closeOnBlur={false}
                          isLazy
                          lazyBehavior="keepMounted"
                        >
                          <HStack>
                            <PopoverAnchor>
                              <Text
                                fontSize={['md', 'xs']}
                                fontWeight="semibold"
                                color="#363755"
                              >
                                {truncate(event.transactionHash)}
                              </Text>
                            </PopoverAnchor>
                            <Spacer />
                            <PopoverTrigger>
                              <Button
                                h="50%"
                                bgColor="#D5AA01"
                                color="white"
                                fontSize={['xs']}
                                fontWeight="semibold"
                                minWidth="64px"
                              >
                                Details
                              </Button>
                            </PopoverTrigger>
                          </HStack>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Text
                                fontSize={['xs']}
                                fontWeight="semibold"
                                color="#363755"
                                p={2}
                              >
                                {event.transactionHash}
                              </Text>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </GridItem>
        </Grid>
      </Box>
    </UnitsModal>
  )
}
