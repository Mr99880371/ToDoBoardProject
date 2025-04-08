import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import MainButton from '../components/MainButton';

const meta: Meta<typeof MainButton> = {
  title: 'Components/MainButton',
  component: MainButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MainButton>;

export const Default: Story = {
  args: {
    label: 'Clique aqui',
    onClick: () => console.log('Botão clicado!'),
  },
};

export const Primary: Story = {
  args: {
    label: 'Clique aqui',
    primary: true,
    onClick: () => console.log('Botão clicado!'),
  },
};
