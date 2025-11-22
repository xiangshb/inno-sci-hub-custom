import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Network, Search, Filter, ExternalLink, Tag, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '@/integrations';
import { KnowledgeNetworkConcepts } from '@/entities';

export default function KnowledgePage() {
  const [concepts, setConcepts] = useState<KnowledgeNetworkConcepts[]>([]);
  const [filteredConcepts, setFilteredConcepts] = useState<KnowledgeNetworkConcepts[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const fetchConcepts = async () => {
      try {
        const { items } = await BaseCrudService.getAll<KnowledgeNetworkConcepts>('knowledgenetworkconcepts');
        setConcepts(items);
        setFilteredConcepts(items);
      } catch (error) {
        console.error('Error fetching knowledge concepts:', error);
      }
    };

    fetchConcepts();
  }, []);

  useEffect(() => {
    let filtered = concepts;

    if (searchTerm) {
      filtered = filtered.filter(concept =>
        concept.conceptName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.definition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.keywords?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(concept => concept.conceptType === selectedType);
    }

    setFilteredConcepts(filtered);
  }, [searchTerm, selectedType, concepts]);

  const uniqueTypes = Array.from(new Set(concepts.map(concept => concept.conceptType).filter(Boolean)));

  const getTypeColor = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'theory':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'methodology':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'technology':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'principle':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'framework':
        return 'bg-pink-100 text-pink-800 border-pink-200';
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
              <Link to="/tools" className="hover:text-secondary transition-colors">Tools</Link>
              <Link to="/knowledge" className="text-secondary">Knowledge Network</Link>
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
            <h1 className="font-heading text-6xl text-primary-foreground mb-6">Knowledge Network</h1>
            <p className="font-paragraph text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Explore the interconnected web of scientific concepts, theories, and methodologies that form the foundation of modern research and discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Knowledge Network Visualization */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Conceptual Interconnections</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Visualizing the relationships between scientific concepts to reveal hidden connections and potential research opportunities.
            </p>
          </motion.div>

          <div className="flex justify-center items-center min-h-[400px] relative">
            <div className="relative w-full max-w-4xl">
              {/* Central Knowledge Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-secondary rounded-full flex items-center justify-center z-10">
                <Network className="w-16 h-16 text-secondary-foreground" />
              </div>
              
              {/* Surrounding Concept Nodes */}
              {concepts.slice(0, 8).map((concept, index) => {
                const angle = (index * 45) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={concept._id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute w-20 h-20 bg-background border-2 border-secondary rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      left: `calc(50% + ${x}px - 40px)`,
                      top: `calc(50% + ${y}px - 40px)`,
                    }}
                  >
                    <BookOpen className="w-8 h-8 text-secondary" />
                  </motion.div>
                );
              })}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {concepts.slice(0, 8).map((_, index) => {
                  const angle = (index * 45) * (Math.PI / 180);
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke="#B94A2A"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  );
                })}
                
                {/* Inter-node connections */}
                {concepts.slice(0, 8).map((_, index) => {
                  if (index < 7) {
                    const angle1 = (index * 45) * (Math.PI / 180);
                    const angle2 = ((index + 1) * 45) * (Math.PI / 180);
                    const radius = 180;
                    const x1 = Math.cos(angle1) * radius;
                    const y1 = Math.sin(angle1) * radius;
                    const x2 = Math.cos(angle2) * radius;
                    const y2 = Math.sin(angle2) * radius;
                    
                    return (
                      <line
                        key={`connection-${index}`}
                        x1={`calc(50% + ${x1}px)`}
                        y1={`calc(50% + ${y1}px)`}
                        x2={`calc(50% + ${x2}px)`}
                        y2={`calc(50% + ${y2}px)`}
                        stroke="#8A8B5E"
                        strokeWidth="1"
                        opacity="0.2"
                      />
                    );
                  }
                  return null;
                })}
              </svg>
            </div>
          </div>
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
                  placeholder="Search concepts, definitions, or keywords..."
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
                <option value="all">All Concept Types</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Concepts Grid */}
      <section className="w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConcepts.map((concept, index) => (
              <motion.div
                key={concept._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-subtleborder p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getTypeColor(concept.conceptType)}`}>
                      {concept.conceptType || 'Concept'}
                    </Badge>
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>

                  <h3 className="font-heading text-xl text-darktext mb-3 leading-tight">
                    {concept.conceptName}
                  </h3>

                  <p className="font-paragraph text-darktext/80 text-sm leading-relaxed mb-4">
                    {concept.definition}
                  </p>

                  {/* Related Concepts */}
                  {concept.relatedConcepts && (
                    <div className="mb-4">
                      <span className="font-paragraph text-darktext/60 text-xs">Related Concepts</span>
                      <p className="font-paragraph text-secondary text-sm mt-1">
                        {concept.relatedConcepts.length > 80 
                          ? `${concept.relatedConcepts.slice(0, 80)}...` 
                          : concept.relatedConcepts
                        }
                      </p>
                    </div>
                  )}

                  {/* Keywords */}
                  {concept.keywords && (
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1">
                        {concept.keywords.split(',').slice(0, 4).map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-subtleborder text-darktext/60">
                            <Tag className="w-2 h-2 mr-1" />
                            {keyword.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Explore
                    </Button>
                    {concept.sourceUrl && (
                      <Button 
                        variant="outline" 
                        className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                        onClick={() => window.open(concept.sourceUrl, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredConcepts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-darktext/20 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-darktext/60 mb-2">No concepts found</h3>
              <p className="font-paragraph text-darktext/40">
                Try adjusting your search terms or filters to discover more knowledge concepts.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Knowledge Categories */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Knowledge Domains</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Our knowledge network spans multiple scientific domains, creating bridges between traditionally separate fields of study.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {uniqueTypes.slice(0, 5).map((type, index) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${getTypeColor(type).replace('text-', 'bg-').replace('border-', '').replace('bg-', 'bg-').replace('-800', '-100')} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <BookOpen className={`w-8 h-8 ${getTypeColor(type).replace('bg-', 'text-').replace('-100', '-600')}`} />
                </div>
                <h3 className="font-heading text-lg text-darktext mb-2 capitalize">{type}</h3>
                <p className="font-paragraph text-darktext/70 text-sm">
                  {concepts.filter(c => c.conceptType === type).length} concepts
                </p>
              </motion.div>
            ))}
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
              <div className="text-4xl font-heading text-secondary mb-2">{concepts.length}</div>
              <div className="font-paragraph text-darktext/80">Knowledge Concepts</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{uniqueTypes.length}</div>
              <div className="font-paragraph text-darktext/80">Concept Types</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {concepts.filter(c => c.sourceUrl).length}
              </div>
              <div className="font-paragraph text-darktext/80">External Sources</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">∞</div>
              <div className="font-paragraph text-darktext/80">Interconnections</div>
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
              Expand the Knowledge Frontier
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Contribute to our growing knowledge network and help create new connections between scientific concepts and discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/visualizations">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  View Visualizations
                </Button>
              </Link>
              <Link to="/insights">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Discover Insights
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}