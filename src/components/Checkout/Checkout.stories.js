import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkout from './Checkout';

storiesOf('Checkout', module)
    .add('default', () => <Checkout />)