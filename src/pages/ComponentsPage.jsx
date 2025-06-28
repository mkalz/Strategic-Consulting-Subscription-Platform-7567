import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { FiStar, FiHeart, FiDownload, FiEye, FiCode } from 'react-icons/fi';

const ComponentsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'ui', name: 'UI Elements' },
    { id: 'forms', name: 'Forms' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'data', name: 'Data Display' },
    { id: 'feedback', name: 'Feedback' }
  ];

  const components = [
    {
      id: 1,
      name: 'Button',
      category: 'ui',
      description: 'Versatile button component with multiple variants and states',
      preview: <Button>Sample Button</Button>,
      downloads: 1234,
      likes: 89
    },
    {
      id: 2,
      name: 'Card',
      category: 'ui',
      description: 'Flexible card component with header, content, and footer sections',
      preview: <Card className="w-48"><Card.Header><Card.Title>Sample Card</Card.Title></Card.Header><Card.Content>Card content here</Card.Content></Card>,
      downloads: 956,
      likes: 67
    },
    {
      id: 3,
      name: 'Modal',
      category: 'feedback',
      description: 'Accessible modal dialog with backdrop and transitions',
      preview: <div className="bg-white p-4 rounded shadow">Modal Preview</div>,
      downloads: 743,
      likes: 52
    },
    {
      id: 4,
      name: 'Navigation',
      category: 'navigation',
      description: 'Responsive navigation component with sidebar and mobile menu',
      preview: <div className="bg-gray-100 p-2 rounded text-sm">Nav Component</div>,
      downloads: 892,
      likes: 78
    },
    {
      id: 5,
      name: 'Form Input',
      category: 'forms',
      description: 'Form input with validation states and helper text',
      preview: <input className="border border-gray-300 rounded px-3 py-2 text-sm" placeholder="Sample input" />,
      downloads: 1156,
      likes: 94
    },
    {
      id: 6,
      name: 'Data Table',
      category: 'data',
      description: 'Feature-rich data table with sorting, filtering, and pagination',
      preview: <div className="bg-gray-50 p-3 rounded text-xs">Table Preview</div>,
      downloads: 678,
      likes: 45
    }
  ];

  const filteredComponents = activeCategory === 'all' 
    ? components 
    : components.filter(comp => comp.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Component Library</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our collection of pre-built React components designed for modern SaaS applications.
          Copy, paste, and customize to fit your needs.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 justify-center"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Components Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredComponents.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Preview */}
            <div className="p-6 bg-gray-50 flex items-center justify-center min-h-[120px]">
              {component.preview}
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{component.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {categories.find(cat => cat.id === component.category)?.name}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{component.description}</p>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <FiDownload className="w-4 h-4 mr-1" />
                    {component.downloads}
                  </span>
                  <span className="flex items-center">
                    <FiHeart className="w-4 h-4 mr-1" />
                    {component.likes}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  <FiEye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FiCode className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredComponents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">No components found in this category</div>
          <Button onClick={() => setActiveCategory('all')}>View All Components</Button>
        </motion.div>
      )}
    </div>
  );
};

export default ComponentsPage;