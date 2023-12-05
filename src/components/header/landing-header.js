import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Collapse,
  Flex,
  Heading,
  Hide,
  Image,
  Link,
  Show,
  useDisclosure,
} from '@chakra-ui/react'
import logo from '~/assets/images/logo.png'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Team',
    href: '#team',
  },
  {
    label: 'Roadmap',
    href: '#roadmap',
  },
  {
    label: 'Community',
    href: '#community',
  },
]

export default function LandingHeader() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      position="sticky"
      top={0}
      width="100%"
      bgColor="white"
      zIndex={40}
      shadow="sm"
      transition="box-shadow 0.1s"
    >
      <Flex
        minHeight="60px"
        alignItems="center"
        justifyContent="space-between"
        py={2}
        px={4}
        pos="sticky"
      >
        {/* Logo and Name */}
        <Flex alignItems="center">
          <Link
            cursor="pointer"
            textDecoration="none"
            href="/"
            _hover={{ textDecoration: 'none' }}
          >
            <Image src={logo.src} alt="Logo" width={160} height={120} />
          </Link>
          <Heading as="p" size="md" pl={4}>
            Kencana Wungu NFT
          </Heading>
        </Flex>
        {/* Desktop and Mobile Navigation */}
        <Box>
          <Hide below="md">
            <DesktopNav />
          </Hide>
          <Show below="md">
            <HamburgerIcon boxSize={6} onClick={onToggle} />
          </Show>
          <Collapse in={isOpen}>
            <MobileNav />
          </Collapse>
        </Box>
      </Flex>
      {/* Gradient Line */}
      <Box
        h="4px"
        background="linear-gradient(to right, #1D1801, #D5AA01 90%)"
      />
    </Box>
  )
}

const DesktopNav = () => {
  return (
    <Flex direction="row" align="center">
      {NAV_ITEMS.map(({ label, href }, index) => (
        <Link
          key={label}
          href={href}
          p={2}
          fontSize={{ base: 'sm', md: 'base' }}
          textDecoration="none"
          color="#2A2928"
          _hover={{ color: 'yellow.400' }}
          marginRight={index === NAV_ITEMS.length - 1 ? 0 : 4}
        >
          {label}
        </Link>
      ))}
    </Flex>
  )
}

const MobileNav = () => {
  return (
    <Flex direction="column" align="center">
      {NAV_ITEMS.map(({ label, href }, index) => (
        <Link
          key={label}
          href={href}
          p={2}
          fontSize={{ base: 'sm', md: 'base' }}
          fontWeight="medium"
          textDecoration="none"
          color="#363755"
          _hover={{ color: 'yellow.400' }}
          marginRight={index === NAV_ITEMS.length - 1 ? 0 : 2}
        >
          {label}
        </Link>
      ))}
    </Flex>
  )
}
