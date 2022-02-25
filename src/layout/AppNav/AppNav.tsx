import React, { FC } from 'react';
import NavLink from 'next/link'
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { UserNinja as UserIcon } from '@styled-icons/fa-solid/UserNinja';
import { BookAdd as NewCourseIcon } from '@styled-icons/fluentui-system-filled/BookAdd';
import { Book as CurrentCourseIcon } from '@styled-icons/fluentui-system-filled/Book';
import isUndefined from 'lodash/isUndefined';
import { Link } from 'ui-kit/actions/Link';
import { useRootStore } from 'src/store';
import { MODAL } from 'src/constants';

const StyledCurrentCourseIcon = styled(CurrentCourseIcon).attrs(() => ({
  className: 'w-6 h-6'
}))``;

const StyledNewCourseIcon = styled(NewCourseIcon).attrs(() => ({
  className: 'w-6 h-6'
}))``;

const StyledUserIcon = styled(UserIcon).attrs(() => ({
  className: 'w-6 h-6'
}))``;

export const AppNav: FC = observer(() => {
  const { uiStore, authStore } = useRootStore();

  const isLoggedIn = !isUndefined(authStore.user);

  const handleLogin = () => {
    uiStore.openModal(MODAL.LOGIN);
  }

  const handleLogout = () => {
    console.log('logout');
  }

  return (
    <nav>
      <button onClick={isLoggedIn ? handleLogout : handleLogin}>{isLoggedIn ? 'Logout' : 'Login'}</button>
      {authStore.userFullName}
      {authStore.accessToken}
      <ul>
        <li>
          <NavLink href='/mock-profile' passHref>
            <Link className='justify-center items-center'>
              profile
              <StyledUserIcon />
            </Link>
          </NavLink>
        </li>
        <li>
          <NavLink href='/mock-current-course' passHref>
            <Link className='justify-center items-center'>
              current-course
              <StyledCurrentCourseIcon />
            </Link>
          </NavLink>
        </li>
        <li>
          <NavLink href='/mock-new-course' passHref>
            <Link className='justify-center items-center'>
              new-course
              <StyledNewCourseIcon />
            </Link>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
});

AppNav.displayName = 'AppNav';
