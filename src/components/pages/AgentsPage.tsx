import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, Brain, Network, Activity, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { IntelligentAgents } from '@/entities';

export default function AgentsPage() {
  const [agents, setAgents] = useState<IntelligentAgents[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { items } = await BaseCrudService.getAll<IntelligentAgents>('intelligentagents');
        setAgents(items);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const filteredAgents = selectedSpecialization === 'all' 
    ? agents 
    : agents.filter(agent => agent.specialization?.toLowerCase().includes(selectedSpecialization.toLowerCase()));

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'idle':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'training':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Activity className="w-3 h-3" />;
      case 'idle':
        return <Bot className="w-3 h-3" />;
      case 'offline':
        return <div className="w-3 h-3 rounded-full bg-red-500" />;
      case 'training':
        return <Brain className="w-3 h-3" />;
      default:
        return <Bot className="w-3 h-3" />;
    }
  };

  const uniqueSpecializations = Array.from(new Set(
    agents.map(agent => agent.specialization).filter(Boolean)
  ));

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
              <Link to="/agents" className="text-secondary">AI Agents</Link>
              <Link to="/tools" className="hover:text-secondary transition-colors">Tools</Link>
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
            <h1 className="font-heading text-6xl text-primary-foreground mb-6">AI Research Agents</h1>
            <p className="font-paragraph text-primary-foreground/80 text-lg max-w-3xl mx-auto">
              Meet our collaborative network of intelligent agents, each specialized in different scientific domains and working together to accelerate discovery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-4xl text-darktext mb-6">Collaborative Intelligence Network</h2>
            <p className="font-paragraph text-darktext/80 text-lg max-w-2xl mx-auto">
              Our agents work in interconnected clusters, sharing knowledge and insights to solve complex scientific challenges.
            </p>
          </motion.div>

          <div className="flex justify-center items-center min-h-[300px] relative">
            <div className="relative">
              {/* Central Network Hub */}
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                <Network className="w-12 h-12 text-secondary-foreground" />
              </div>
              
              {/* Surrounding Agent Nodes */}
              {agents.slice(0, 6).map((agent, index) => {
                const angle = (index * 60) * (Math.PI / 180);
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={agent._id}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="absolute w-16 h-16 bg-background border-2 border-secondary rounded-full flex items-center justify-center"
                    style={{
                      left: `calc(50% + ${x}px - 32px)`,
                      top: `calc(50% + ${y}px - 32px)`,
                    }}
                  >
                    <Bot className="w-8 h-8 text-secondary" />
                  </motion.div>
                );
              })}
              
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {agents.slice(0, 6).map((_, index) => {
                  const angle = (index * 60) * (Math.PI / 180);
                  const radius = 120;
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
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="w-full bg-background border-b border-subtleborder">
        <div className="max-w-[100rem] mx-auto px-8 py-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-paragraph text-darktext/60 text-sm">Filter by specialization:</span>
            <Button
              variant={selectedSpecialization === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSpecialization('all')}
              className={selectedSpecialization === 'all' ? 'bg-secondary text-secondary-foreground' : 'border-subtleborder text-darktext hover:bg-secondary hover:text-secondary-foreground'}
            >
              All Agents
            </Button>
            {uniqueSpecializations.map(specialization => (
              <Button
                key={specialization}
                variant={selectedSpecialization === specialization ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSpecialization(specialization || '')}
                className={selectedSpecialization === specialization ? 'bg-secondary text-secondary-foreground' : 'border-subtleborder text-darktext hover:bg-secondary hover:text-secondary-foreground'}
              >
                {specialization}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="w-full">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent, index) => (
              <motion.div
                key={agent._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-background border-subtleborder p-6 h-full hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={`${getStatusColor(agent.status)} flex items-center gap-2`}>
                      {getStatusIcon(agent.status)}
                      {agent.status || 'Unknown'}
                    </Badge>
                    <Bot className="w-5 h-5 text-secondary" />
                  </div>

                  {/* Agent Image */}
                  {agent.agentImage && (
                    <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-mutedolive/10">
                      <Image 
                        src={agent.agentImage} 
                        alt={agent.name || 'AI Agent'}
                        className="w-full h-full object-cover"
                        width={300}
                      />
                    </div>
                  )}

                  <h3 className="font-heading text-xl text-darktext mb-3 leading-tight">
                    {agent.name}
                  </h3>

                  <div className="mb-4">
                    <span className="font-paragraph text-darktext/60 text-sm">Specialization</span>
                    <p className="font-paragraph text-secondary font-semibold text-sm">
                      {agent.specialization}
                    </p>
                  </div>

                  <p className="font-paragraph text-darktext/80 text-sm leading-relaxed mb-6">
                    {agent.description}
                  </p>

                  {/* Creation Date */}
                  {agent.creationDate && (
                    <div className="flex items-center text-xs text-darktext/60 mb-6">
                      <Calendar className="w-3 h-3 mr-2" />
                      Created {new Date(agent.creationDate).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Collaborate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <Brain className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-16">
              <Bot className="w-16 h-16 text-darktext/20 mx-auto mb-4" />
              <h3 className="font-heading text-2xl text-darktext/60 mb-2">No agents found</h3>
              <p className="font-paragraph text-darktext/40">
                Try adjusting your filters to discover more AI research agents.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="w-full bg-mutedolive/10">
        <div className="max-w-[100rem] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{agents.length}</div>
              <div className="font-paragraph text-darktext/80">Active AI Agents</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">
                {agents.filter(a => a.status?.toLowerCase() === 'active').length}
              </div>
              <div className="font-paragraph text-darktext/80">Currently Active</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">{uniqueSpecializations.length}</div>
              <div className="font-paragraph text-darktext/80">Specialization Areas</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-heading text-secondary mb-2">24/7</div>
              <div className="font-paragraph text-darktext/80">Continuous Operation</div>
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
              Join the AI Research Revolution
            </h2>
            <p className="font-paragraph text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Collaborate with our intelligent agents to unlock new scientific frontiers and accelerate breakthrough discoveries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Explore Tools
                </Button>
              </Link>
              <Link to="/research-plans">
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  View Research Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}