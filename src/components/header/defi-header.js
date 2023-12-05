import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Hide,
  Image,
  Link,
  Show,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { NextLink } from 'next/link'
import logo from '~/assets/images/logo.png'

export default function DeFiHeader() {
  const itemNav = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: 'Dashboard',
      link: '/dashboard',
    },
  ]
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        pos="sticky"
        w="100%"
        zIndex={2}
        bgColor="#FFFAF5"
        p={4}
        color="#D5AA01"
      >
        <Flex alignItems="center">
          <Link
            cursor="pointer"
            textDecoration="none"
            href="/"
            _hover={{ textDecoration: 'none' }}
          >
            <Image src={logo.src} alt="Logo" width={32} height={24} />
          </Link>
          <Heading as="p" size="md" pl={4}>
            Kencana Wungu NFT
          </Heading>
        </Flex>
        <Hide above="sm">
          {isOpen ? (
            <CloseIcon onClick={onToggle} />
          ) : (
            <HamburgerIcon onClick={onToggle} />
          )}
        </Hide>
        <Show above="sm">
          <Flex direction="row" align="center" gap={12}>
            <Link href="/">
              <Text>Home</Text>
            </Link>
            <Link as={NextLink} href="/dashboard">
              <Text>Dashboard</Text>
            </Link>
          </Flex>
        </Show>
      </Flex>
      {/* Gradient Line */}
      <Box
        h="4px"
        background="linear-gradient(to right, #1D1801, #D5AA01 90%)"
      />
      {/* Mobile Nav */}
      <Collapse in={isOpen} animateOpacity>
        <Box p={4} bg="#FFFAF5">
          {itemNav.map(({ label, link }) => (
            <Stack spacing={4} my={2} key={label}>
              <Link href={link}>
                <Text fontWeight="semibold">{label}</Text>
              </Link>
              <Box bgColor="#D5AA01" h="1px"></Box>
            </Stack>
          ))}
        </Box>
      </Collapse>
    </>
  )
}
