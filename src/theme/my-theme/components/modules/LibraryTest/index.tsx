import {
  ModuleFields,
  TextField,
  ChoiceField,
} from '@hubspot/cms-components/fields';
import { FaReact, FaHeart, FaRocket, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { cn } from '../../../lib/utils.js';
import { Button } from '../../ui/button.js';
import '../../../styles/globals.css';

export function Component({ fieldValues }) {
  const { title, variant, showIcons } = fieldValues;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">
            Testing all installed libraries and components
          </p>
        </div>

        {/* Icons Section */}
        {showIcons && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              {/* @ts-ignore */}
              <HiSparkles className="text-yellow-500" />
              React Icons
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                {/* @ts-ignore */}
                <FaReact className="text-4xl text-blue-500 mb-2" />
                <span className="text-sm font-medium">React</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-red-50 rounded-lg">
                {/* @ts-ignore */}
                <FaHeart className="text-4xl text-red-500 mb-2" />
                <span className="text-sm font-medium">Heart</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
                {/* @ts-ignore */}
                <FaRocket className="text-4xl text-purple-500 mb-2" />
                <span className="text-sm font-medium">Rocket</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                {/* @ts-ignore */}
                <FaCheckCircle className="text-4xl text-green-500 mb-2" />
                <span className="text-sm font-medium">Check</span>
              </div>
            </div>
          </div>
        )}

        {/* Tailwind Utility Classes Test */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Tailwind CSS Classes</h2>
          <div className="space-y-4">
            <div
              className={cn(
                'p-4 rounded-lg',
                variant === 'primary' && 'bg-blue-500 text-white',
                variant === 'secondary' && 'bg-gray-500 text-white',
                variant === 'success' && 'bg-green-500 text-white',
              )}
            >
              <p className="font-medium">Dynamic styling with cn() utility</p>
              <p className="text-sm opacity-90 mt-1">Variant: {variant}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-lg text-white">
                <p className="font-semibold">Gradient</p>
              </div>
              <div className="bg-indigo-500 p-4 rounded-lg text-white shadow-xl">
                <p className="font-semibold">Shadow</p>
              </div>
              <div className="bg-teal-500 p-4 rounded-lg text-white transform hover:scale-105 transition-transform">
                <p className="font-semibold">Hover Effect</p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section - shadcn/ui */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            shadcn/ui Button Component
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <FaHeart />
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="default" className="gap-2">
              <FaRocket />
              With Icon
            </Button>
            <Button variant="outline" className="gap-2">
              <FaCheckCircle />
              Success
            </Button>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl p-6 text-white">
          <div className="flex items-center gap-3">
            {/* @ts-ignore */}
            <FaCheckCircle className="text-3xl" />
            <div>
              <h3 className="text-xl font-bold">All Libraries Working!</h3>
              <p className="text-sm opacity-90">
                React Icons ✓ | Tailwind CSS ✓ | shadcn/ui ✓ | clsx &
                tailwind-merge ✓
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const fields = (
  <ModuleFields
    children={
      <>
        <TextField
          name="title"
          label="Title"
          default="Library Test Component"
        />
        <ChoiceField
          name="variant"
          label="Color Variant"
          default="primary"
          choices={[
            ['primary', 'Primary (Blue)'],
            ['secondary', 'Secondary (Gray)'],
            ['success', 'Success (Green)'],
          ]}
        />
        <ChoiceField
          name="showIcons"
          label="Show Icons Section"
          default="true"
          choices={[
            ['true', 'Yes'],
            ['false', 'No'],
          ]}
        />
      </>
    }
  />
);

export const meta = {
  label: 'Library Test Component',
};
