import React, { useContext } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { WinesContext } from '../../wineContext/WinesContextProvider';

const getMenuStyles = () => ({
  bmBurgerButton: {
    position: 'absolute',
    width: 26,
    height: 20,
    left: 30,
    top: 20,
    // zIndex: 19,
  },
  bmBurgerBars: {
    background: '#6439ff',
  },
  bmBurgerBarsHover: {
    background: '#6439ff',
  },
  bmCrossButton: {
    display: 'none',
  },
  bmCross: {
    background: '#6439ff',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    width: 200,
    // zIndex: 30,
  },
  bmMenu: {
    background: '#6439ff',
  },
  bmItem: {
    outline: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  bmMorphShape: {
    fill: '#6439ff',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
    // zIndex: 20,
  },
});

function MenuComponent({ children, isMobile }) {
  const menuStyles = getMenuStyles();
  const { isOpenBarMenu, setIsOpenBarMenu } = useContext(WinesContext);

  return (
    <Menu
      isOpen={!isMobile || isOpenBarMenu}
      noOverlay={!isMobile}
      disableCloseOnEsc
      styles={menuStyles}
      onStateChange={(state) => setIsOpenBarMenu(state.isOpen)}
    >
      {children}
    </Menu>
  );
}

export default MenuComponent;
