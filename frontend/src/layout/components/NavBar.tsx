import { Flex } from '@chakra-ui/react';
import NavButton from './NavButton';

const navigation = [
  {
    to: '/home',
    label: 'Home',
  },
  {
    to: '/about',
    label: 'About',
  },
];

export default function NavBar() {
  return (
    <Flex ml={5}>
      {navigation.map(({ to, label }) => {
        return (
          <NavButton key={to} to={to}>
            {label}
          </NavButton>
        );
      })}
    </Flex>
  );
}
