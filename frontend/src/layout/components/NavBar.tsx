import { Flex } from '@chakra-ui/react';
import NavButton from './NavButton';

const navigation = [
  {
    to: '/',
    label: 'Explore Channel',
  },
  {
    to: '/about',
    label: 'About',
  },
];

export default function NavBar() {
  return (
    <Flex>
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
