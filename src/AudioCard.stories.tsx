import type { Meta, StoryObj } from '@storybook/react'
import { AudioCard } from './AudioCard'

const meta: Meta<typeof AudioCard> = {
  title: 'AudioCard/AudioCard',
  component: AudioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    source: { control: 'text' },
    title: { control: 'text' },
    art: { control: 'text' },
    duration: { control: 'number' },
    currentTime: { control: 'number' },
    width: { control: 'number' },
    color: { control: 'color' },
    background: { control: 'color' },
    progressBarBackground: { control: 'color' },
    progressBarCompleteBackground: { control: 'color' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Sample Audio',
    duration: 120,
    currentTime: 30,
    width: 750,
  },
}

export const WithArtwork: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Sample Audio with Artwork',
    art: 'https://picsum.photos/225/225?random=1',
    duration: 180,
    currentTime: 60,
    width: 750,
  },
}

export const CustomColors: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Custom Colored Audio Card',
    color: '#ff6b6b',
    background: '#2c3e50',
    progressBarBackground: '#34495e',
    progressBarCompleteBackground: '#e74c3c',
    duration: 240,
    currentTime: 120,
    width: 750,
  },
}

export const SmallWidth: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Small Width Audio Card',
    duration: 90,
    currentTime: 45,
    width: 400,
  },
}

export const WithLink: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Audio Card with Link',
    link: 'https://example.com',
    linkText: 'Visit Website',
    duration: 150,
    currentTime: 75,
    width: 750,
  },
}

export const WithDifferentArtwork: Story = {
  args: {
    source: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Audio Card with Different Artwork',
    art: 'https://picsum.photos/225/225?random=2',
    duration: 200,
    currentTime: 100,
    width: 750,
  },
}
