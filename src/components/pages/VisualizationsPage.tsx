import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, ExternalLink, Search, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { VisualizationAnalysis } from '@/entities';

export default function VisualizationsPage() {
  const [visualizations, setVisualizations] = useState<VisualizationAnalysis[]>([]);
  const [filteredVisualizations, setFilteredVisualizations] = useState<VisualizationAnalysis[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVisualizations = async () => {
      try {
        const { items } = await BaseCrudService.getAll<VisualizationAnalysis>('visualizationanalysis');
        setVisualizations(items);
        setFilteredVisualizations(items);
      } catch (error) {
        console.error('Error fetching visualizations:', error);
      }
    };

    fetchVisualizations();
  }, []);

  useEffect(() => {
    let filtered = visualizations;

    if (searchTerm) {
      filtered = filtered.filter(viz =>
        viz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viz.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        viz.keyMetrics?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredVisualizations(filtered);
  }, [searchTerm, visualizations]);

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
              <Link to="/tools" className="hover:text-secondary transition-colors">Tools</Link>
              <Link to="/knowledge" className="hover:text-secondary transition-colors">Knowledge Network</Link>
              <Link to="/visualizations" className="text-secondary">Visualizations</Link>
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
            <h1 className="font-heading text-6xl text-primary-foreground mb-6">Visualization Analysis</h1>
            <p className="font-paragraph text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Transform complex scientific data into compelling visual narratives that reveal hidden patterns, trends, and breakthrough opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Real-Time Analytics Dashboard</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Monitor scientific progress across all research domains with live data visualization and predictive analytics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg p-6 border border-subtleborder"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-paragraph text-darktext font-semibold">Active Research</h3>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl font-heading text-secondary mb-2">247</div>
              <div className="text-sm font-paragraph text-darktext/60">Projects Running</div>
              <div className="mt-4 h-2 bg-subtleborder rounded-full">
                <div className="h-2 bg-secondary rounded-full w-3/4"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-background rounded-lg p-6 border border-subtleborder"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-paragraph text-darktext font-semibold">Discoveries</h3>
                <BarChart3 className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl font-heading text-secondary mb-2">89</div>
              <div className="text-sm font-paragraph text-darktext/60">This Month</div>
              <div className="mt-4 h-2 bg-subtleborder rounded-full">
                <div className="h-2 bg-secondary rounded-full w-4/5"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background rounded-lg p-6 border border-subtleborder"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-paragraph text-darktext font-semibold">AI Agents</h3>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl font-heading text-secondary mb-2">156</div>
              <div className="text-sm font-paragraph text-darktext/60">Currently Active</div>
              <div className="mt-4 h-2 bg-subtleborder rounded-full">
                <div className="h-2 bg-secondary rounded-full w-5/6"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-background rounded-lg p-6 border border-subtleborder"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-paragraph text-darktext font-semibold">Efficiency</h3>
                <TrendingUp className="w-5 h-5 text-secondary" />
              </div>
              <div className="text-3xl font-heading text-secondary mb-2">94%</div>
              <div className="text-sm font-paragraph text-darktext/60">System Performance</div>
              <div className="mt-4 h-2 bg-subtleborder rounded-full">
                <div className="h-2 bg-secondary rounded-full w-11/12"></div>
              </div>
            </motion.div>
          </div>

          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-background rounded-lg p-8 border border-subtleborder"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl text-darktext">Research Progress Timeline</h3>
              <Badge className="bg-secondary text-secondary-foreground">Live Data</Badge>
            </div>
            <div className="h-64 bg-mutedolive/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-secondary mx-auto mb-4" />
                <p className="font-paragraph text-darktext/60">Interactive chart visualization would appear here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search */}
      <section className="w-full bg-background border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-darktext/40 w-4 h-4" />
                <Input
                  placeholder="Search visualizations, metrics, or analysis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-subtleborder focus:border-secondary"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Filter className="w-4 h-4 text-darktext/60" />
              <span className="font-paragraph text-darktext/60 text-sm">
                {filteredVisualizations.length} visualizations found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visualizations Grid */}
      <section className="w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVisualizations.map((viz, index) => (
              <motion.div
                key={viz._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-subtleborder overflow-hidden h-full hover:shadow-lg transition-shadow">
                  {/* Visualization Image */}
                  {viz.visualizationImage && (
                    <div className="w-full h-48 bg-mutedolive/10">
                      <Image 
                        src={viz.visualizationImage} 
                        alt={viz.title || 'Visualization'}
                        className="w-full h-full object-cover"
                        width={400}
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                        Analysis
                      </Badge>
                      <BarChart3 className="w-5 h-5 text-secondary" />
                    </div>

                    <h3 className="font-heading text-xl text-darktext mb-3 leading-tight">
                      {viz.title}
                    </h3>

                    <p className="font-paragraph text-darktext/80 text-sm leading-relaxed mb-4">
                      {viz.summary}
                    </p>

                    {/* Key Metrics */}
                    {viz.keyMetrics && (
                      <div className="mb-4">
                        <span className="font-paragraph text-darktext/60 text-xs">Key Metrics</span>
                        <p className="font-paragraph text-secondary text-sm mt-1">
                          {viz.keyMetrics.length > 80 
                            ? `${viz.keyMetrics.slice(0, 80)}...` 
                            : viz.keyMetrics
                          }
                        </p>
                      </div>
                    )}

                    {/* Analysis Date */}
                    {viz.analysisDate && (
                      <div className="flex items-center text-xs text-darktext/60 mb-6">
                        <Calendar className="w-3 h-3 mr-2" />
                        Analyzed {new Date(viz.analysisDate).toLocaleDateString()}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      >
                        View Analysis
                      </Button>
                      {viz.sourceUrl && (
                        <Button 
                          variant="outline" 
                          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                          onClick={() => window.open(viz.sourceUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredVisualizations.length === 0 && (
            <div className="text-center py-16">
              <BarChart3 className="w-16 h-16 text-darktext/20 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-darktext/60 mb-2">No visualizations found</h3>
              <p className="font-paragraph text-darktext/40">
                Try adjusting your search terms to discover more data visualizations.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Visualization Types */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Visualization Capabilities</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Our platform supports multiple visualization types to represent complex scientific data in intuitive and actionable formats.
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
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Statistical Charts</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Bar charts, line graphs, and scatter plots for quantitative analysis.
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
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Trend Analysis</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Time-series visualizations showing research progress and patterns.
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
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">Network Graphs</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Relationship mapping between concepts, agents, and research areas.
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
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-heading text-lg text-darktext mb-2">3D Models</h3>
              <p className="font-paragraph text-darktext/70 text-sm">
                Interactive 3D representations of complex scientific structures.
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
              <div className="text-4xl font-heading text-secondary mb-2">{visualizations.length}</div>
              <div className="font-paragraph text-darktext/80">Active Visualizations</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {visualizations.filter(v => v.sourceUrl).length}
              </div>
              <div className="font-paragraph text-darktext/80">External Data Sources</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">24/7</div>
              <div className="font-paragraph text-darktext/80">Real-Time Updates</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">∞</div>
              <div className="font-paragraph text-darktext/80">Data Points Processed</div>
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
              Transform Data into Discovery
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Leverage our advanced visualization tools to uncover hidden patterns in your research data and accelerate scientific breakthroughs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Explore Tools
                </Button>
              </Link>
              <Link to="/insights">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Insights
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}