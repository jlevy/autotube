import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Box, Button, ChakraProps } from '@chakra-ui/react';

interface NavButtonProps extends ChakraProps {
  to: string;
  children: React.ReactNode;
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ to, children, ...props }, ref) => {
    const { asPath } = useRouter();
    const isActive = asPath === to;

    return (
      <Box borderBottom={isActive ? '2px' : '0'} borderColor="selectionAccent" mr={2}>
        <Link href={to} passHref tabIndex={-1}>
          <Button
            ref={ref}
            size="sm"
            px={2}
            fontSize="sm"
            color={isActive ? 'activeText' : 'menuText'}
            borderRadius="0"
            variant="ghost"
            _hover={{ bg: 'selectorGentle' }}
            {...props} // Spread remaining ChakraProps to the Button component
          >
            {children}
          </Button>
        </Link>
      </Box>
    );
  },
);

NavButton.displayName = 'NavButton';

export default NavButton;
