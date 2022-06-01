import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';

import DomainSearchSection from './DomainSearchSection';

import type { Props } from './DomainSearchSection';
import type { Story } from '@storybook/react';

export default {
  title: 'Components/DomainSearchSection',
  component: DomainSearchSection,
  argTypes: { domainSubmitHandler: { action: 'Submit Domain' }, onKeyPress: { action: 'Submit Domain' } },
};

const Template: Story<Props> = (props) => {
  const [domain, setDomain] = React.useState('');

  const onChange = (event: any) => {
    setDomain(event.target.value);
  };

  const onSubmit = () => {
    console.info(`Submitted: ${domain}`);
  };

  return <DomainSearchSection {...props} domainSearchName={domain} onChange={onChange} />;
};

export const Primary: Story<Props> = Template.bind({});
