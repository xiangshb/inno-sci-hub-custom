import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, ExternalLink, Code, Database, Search, Filter, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MockDataService } from '@/services/mockDataService';
import { IntelligentTools } from '@/services/mockDataService';

export default function ToolsPage() {
  const [tools, setTools] = useState<IntelligentTools[]>([]);
  const [filteredTools, setFilteredTools] = useState<IntelligentTools[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { items } = await MockDataService.getAll<IntelligentTools>('intelligenttools');
        setTools(items);
        setFilteredTools(items);
      } catch (error) {
        console.error('Error fetching tools:', error);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => {
    let filtered = tools;

    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.toolName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.developer?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(tool => tool.toolType === selectedType);
    }

    setFilteredTools(filtered);
  }, [searchTerm, selectedType, tools]);

  const uniqueTypes = Array.from(new Set(tools.map(tool => tool.toolType).filter(Boolean)));

  const getTypeIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'database':
        return <Database className="w-4 h-4" />;
      case 'api':
        return <Code className="w-4 h-4" />;
      case 'analysis':
        return <Search className="w-4 h-4" />;
      case 'visualization':
        return <Globe className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'database':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'api':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'analysis':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'visualization':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="w-full bg-primary border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-primary-foreground font-paragraph text-sm tracking-wider hover:text-secondary transition-colors">
              ← SCIENTIFIC DISCOVERY PLATFORM
            </Link>
            <div className="hidden md:flex space-x-8 text-primary-foreground font-paragraph text-sm">
              <Link to="/insights" className="hover:text-secondary transition-colors">Insights</Link>
              <Link to="/research-plans" className="hover:text-secondary transition-colors">Research Plans</Link>
              <Link to="/agents" className="hover:text-secondary transition-colors">AI Agents</Link>
              <Link to="/tools" className="text-secondary">Tools</Link>
              <Link to="/knowledge" className="hover:text-secondary transition-colors">Knowledge Network</Link>
              <Link to="/visualizations" className="hover:text-secondary transition-colors">Visualizations</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="w-full bg-primary">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-heading text-6xl text-primary-foreground mb-6">Intelligent Tools</h1>
            <p className="font-paragraph text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Discover our comprehensive ecosystem of intelligent tools designed to enhance scientific research, data analysis, and knowledge discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="w-full bg-background border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darktext/40 w-4 h-4" />
                <Input
                  placeholder="Search tools, developers, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-subtleborder focus:border-secondary"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-darktext/60" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-subtleborder rounded-md px-3 py-2 font-paragraph text-sm focus:border-secondary focus:outline-none"
              >
                <option value="all">All Tool Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-subtleborder p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getTypeColor(tool.toolType)} flex items-center gap-2`}>
                      {getTypeIcon(tool.toolType)}
                      {tool.toolType || 'Tool'}
                    </Badge>
                    <Wrench className="w-5 h-5 text-secondary" />
                  </div>

                  <h3 className="font-heading text-xl text-darktext mb-3 leading-tight">
                    {tool.toolName}
                  </h3>

                  <p className="font-paragraph text-darktext/80 text-sm leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  {/* Developer */}
                  {tool.developer && (
                    <div className="mb-4">
                      <span className="font-paragraph text-darktext/60 text-xs">Developer</span>
                      <p className="font-paragraph text-secondary font-semibold text-sm">
                        {tool.developer}
                      </p>
                    </div>
                  )}

                  {/* Version */}
                  {tool.version && (
                    <div className="mb-4">
                      <span className="font-paragraph text-darktext/60 text-xs">Version</span>
                      <p className="font-paragraph text-darktext text-sm">
                        {tool.version}
                      </p>
                    </div>
                  )}

                  {/* Integration Details */}
                  {tool.integrationDetails && (
                    <div className="mb-6">
                      <span className="font-paragraph text-darktext/60 text-xs">Integration</span>
                      <p className="font-paragraph text-darktext/70 text-xs leading-relaxed mt-1">
                        {tool.integrationDetails.length > 100 
                          ? `${tool.integrationDetails.slice(0, 100)}...` 
                          : tool.integrationDetails
                        }
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Integrate
                    </Button>
                    {tool.documentationUrl && (
                      <Button 
                        variant="outline" 
                        className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        onClick={() => window.open(tool.documentationUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <Wrench className="w-16 h-16 text-darktext/20 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-darktext/60 mb-2">No tools found</h3>
              <p className="font-paragraph text-darktext/40">
                Try adjusting your search terms or filters to discover more tools.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tool Categories */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Tool Categories</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Our intelligent tools span multiple categories to support every aspect of scientific research and discovery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Database Tools</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Advanced data storage and retrieval systems for scientific datasets.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">API Integrations</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Seamless connections to external research platforms and services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Analysis Tools</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Powerful analytical engines for data processing and pattern recognition.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Visualization</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Interactive visualization tools for complex scientific data representation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="w-full bg-background">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{tools.length}</div>
              <div className="font-paragraph text-darktext/80">Available Tools</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{uniqueTypes.length}</div>
              <div className="font-paragraph text-darktext/80">Tool Categories</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {Array.from(new Set(tools.map(t => t.developer).filter(Boolean))).length}
              </div>
              <div className="font-paragraph text-darktext/80">Contributing Developers</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">100%</div>
              <div className="font-paragraph text-darktext/80">AI-Enhanced</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-primary">
        <div className="max-w-[100rem] mx-auto px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl text-primary-foreground mb-6">
              Build with Intelligent Tools
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Integrate our powerful tools into your research workflow and accelerate scientific discovery with AI-enhanced capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/knowledge">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Explore Knowledge Network
                </Button>
              </Link>
              <Link to="/agents">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Meet AI Agents
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}