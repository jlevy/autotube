import { useEffect } from 'react';
import { TbMenu2 } from 'react-icons/tb';
import { colors } from '@/styles/utils/theme';
import {
    Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, IconButton, useBreakpointValue,
    useDisclosure
} from '@chakra-ui/react';
import NavBar from './NavBar';
import Sidebar from './Sidebar';

const SIDEBAR_WIDTH = '15%';
const MAIN_WIDTH = '85%';

interface LayoutProps {
  extraWide?: boolean;
  children: React.ReactNode;
}

/**
 * Basic layout with main content and a sidebar on the left that is responsive
 * and can slide into a drawer.
 */
export default function Layout(props: LayoutProps) {
  const { children, extraWide = true } = props;
  // TODO: Works on desktop but fix responsive layout. Sidebar still isn't properly responsive.
  const shouldHideSidebar = useBreakpointValue({ base: false, sm: true, md: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  useEffect(() => {
    if (shouldHideSidebar && isOpen) {
      onClose();
    } else if (!shouldHideSidebar && !isOpen) {
      onOpen();
    }
  }, [shouldHideSidebar, isOpen, onOpen, onClose]);

  const sidebarContent = (
    <Box
      w={SIDEBAR_WIDTH}
      minWidth="300px"
      p={6}
      borderRight="1px"
      borderColor="shade.300"
      bg="white"
    >
      <Sidebar />
    </Box>
  );

  const drawerContent = (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Sidebar />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  const widthProps = extraWide
    ? { overflowX: 'auto' as const, minWidth: MAIN_WIDTH }
    : { flex: '1', maxWidth: isOpen ? MAIN_WIDTH : '100%' };

  const mainContent = (
    <Box
      px={10}
      py={5}
      shadow="md"
      {...widthProps}
      pb="200px"
      bg="white"
      borderLeft={colors.boxBorder}
    >
      <NavBar />
      <Box mt={5}>{children}</Box>
    </Box>
  );

  return (
    <Flex minHeight="100vh" overflow="hidden">
      {!isOpen ? (
        <>
          {drawerContent}
          <IconButton
            icon={<TbMenu2 />}
            variant="transparent"
            color="brand.500"
            onClick={onOpen}
            position="fixed"
            top={2}
            left={2}
            zIndex="sticky"
            aria-label={'Open Sidebar'}
          />
        </>
      ) : (
        <>{sidebarContent}</>
      )}

      {mainContent}
    </Flex>
  );
}
