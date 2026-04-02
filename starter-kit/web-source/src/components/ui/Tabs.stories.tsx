// @ts-nocheck
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { HomeIcon, SettingsIcon, UserIcon, BellIcon, SearchIcon, BookmarkIcon, StarIcon, HeartIcon } from 'lucide-react';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  subcomponents: { TabsList, TabsTrigger, TabsContent },
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default value for uncontrolled tabs',
    },
    value: {
      control: 'text',
      description: 'The controlled value of the active tab',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when tab selection changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="p-4 border rounded-b-lg">Overview content goes here.</div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="p-4 border rounded-b-lg">Analytics content goes here.</div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 border rounded-b-lg">Reports content goes here.</div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 border rounded-b-lg">Settings content goes here.</div>
      </TabsContent>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Active tab: <strong>{value}</strong>
        </div>
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">First</TabsTrigger>
            <TabsTrigger value="tab2">Second</TabsTrigger>
            <TabsTrigger value="tab3">Third</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <div className="p-4 border rounded-b-lg">First tab content</div>
          </TabsContent>
          <TabsContent value="tab2">
            <div className="p-4 border rounded-b-lg">Second tab content</div>
          </TabsContent>
          <TabsContent value="tab3">
            <div className="p-4 border rounded-b-lg">Third tab content</div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled tabs with external state management.',
      },
    },
  },
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="enabled">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <div className="p-4 border rounded-b-lg">Active tab content</div>
      </TabsContent>
      <TabsContent value="disabled">
        <div className="p-4 border rounded-b-lg">This content is not accessible</div>
      </TabsContent>
      <TabsContent value="enabled">
        <div className="p-4 border rounded-b-lg">Enabled tab content</div>
      </TabsContent>
    </Tabs>
  ),
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabsList className="flex-wrap">
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
        <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Home content</div>
      </TabsContent>
      <TabsContent value="profile">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Profile content</div>
      </TabsContent>
      <TabsContent value="messages">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Messages content</div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Notifications content</div>
      </TabsContent>
      <TabsContent value="search">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Search content</div>
      </TabsContent>
      <TabsContent value="bookmarks">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Bookmarks content</div>
      </TabsContent>
      <TabsContent value="favorites">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Favorites content</div>
      </TabsContent>
      <TabsContent value="likes">
        <div className="p-4 border rounded-b-lg min-w-[300px]">Likes content</div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example with many tabs demonstrating wrap behavior.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabsList>
        <TabsTrigger value="home">
          <HomeIcon className="w-4 h-4 mr-2" />
          Home
        </TabsTrigger>
        <TabsTrigger value="search">
          <SearchIcon className="w-4 h-4 mr-2" />
          Search
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellIcon className="w-4 h-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="settings">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="p-4 border rounded-b-lg min-w-[300px]">
          <div className="flex items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            <span>Home dashboard content</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="search">
        <div className="p-4 border rounded-b-lg min-w-[300px]">
          <div className="flex items-center gap-2">
            <SearchIcon className="w-5 h-5" />
            <span>Search interface</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="notifications">
        <div className="p-4 border rounded-b-lg min-w-[300px]">
          <div className="flex items-center gap-2">
            <BellIcon className="w-5 h-5" />
            <span>Notifications panel</span>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 border rounded-b-lg min-w-[300px]">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <span>Settings page</span>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with icons alongside text labels.',
      },
    },
  },
};
