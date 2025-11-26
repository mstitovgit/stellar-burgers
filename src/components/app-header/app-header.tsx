import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/userSlice';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(selectUser).user?.name} />
);
