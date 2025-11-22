/**
 * Mock data service for static deployment
 * Replaces Wix BaseCrudService with mock data
 */

// Import entity types directly to avoid path resolution issues
interface ScientificInsights {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  summary?: string;
  detailedExplanation?: string;
  discoveryDate?: Date | string;
  aiModelUsed?: string;
  relevanceScore?: number;
  keywords?: string;
}

interface ResearchPlans {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  planTitle?: string;
  goal?: string;
  methodology?: string;
  keyMilestones?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  status?: string;
  planSummary?: string;
}

interface IntelligentAgents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  name?: string;
  specialization?: string;
  status?: string;
  description?: string;
  agentImage?: string;
  creationDate?: Date | string;
}

interface IntelligentTools {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  toolName?: string;
  description?: string;
  integrationDetails?: string;
  toolType?: string;
  developer?: string;
  documentationUrl?: string;
  version?: string;
}

interface KnowledgeNetworkConcepts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  conceptName?: string;
  definition?: string;
  relatedConcepts?: string;
  conceptType?: string;
  keywords?: string;
  sourceUrl?: string;
}

interface VisualizationAnalysis {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  title?: string;
  visualizationImage?: string;
  summary?: string;
  analysisDate?: Date | string;
  sourceUrl?: string;
  keyMetrics?: string;
}

// Mock data
const mockInsights: ScientificInsights[] = [
  {
    _id: 'insight_001',
    _createdDate: new Date('2024-01-15'),
    _updatedDate: new Date('2024-01-15'),
    title: 'Quantum Entanglement in Biological Systems',
    summary: 'Discovery of quantum coherence effects in photosynthetic complexes suggests biological systems may leverage quantum mechanics for energy transfer efficiency.',
    detailedExplanation: 'Advanced spectroscopic analysis reveals long-lived quantum coherence in marine algae photosystems, challenging traditional understanding of biological energy transfer mechanisms.',
    discoveryDate: new Date('2024-01-10'),
    aiModelUsed: 'Quantum-Bio v3.2',
    relevanceScore: 0.92,
    keywords: 'quantum biology, photosynthesis, energy transfer, coherence'
  },
  {
    _id: 'insight_002',
    _createdDate: new Date('2024-01-12'),
    _updatedDate: new Date('2024-01-12'),
    title: 'Machine Learning Predicts Protein Folding with 98% Accuracy',
    summary: 'Novel neural network architecture achieves unprecedented accuracy in predicting 3D protein structures from amino acid sequences.',
    detailedExplanation: 'Integration of attention mechanisms with physics-based constraints enables accurate modeling of complex protein folding pathways.',
    discoveryDate: new Date('2024-01-08'),
    aiModelUsed: 'AlphaFold-X',
    relevanceScore: 0.89,
    keywords: 'protein folding, machine learning, structural biology, AI'
  },
  {
    _id: 'insight_003',
    _createdDate: new Date('2024-01-10'),
    _updatedDate: new Date('2024-01-10'),
    title: 'CRISPR Gene Editing Off-Target Effects Mapped',
    summary: 'Comprehensive analysis reveals patterns in CRISPR-Cas9 off-target activity across diverse genomic contexts.',
    detailedExplanation: 'High-throughput sequencing identifies sequence motifs and chromatin states associated with increased off-target editing.',
    discoveryDate: new Date('2024-01-05'),
    aiModelUsed: 'Genome-Analyzer v2.1',
    relevanceScore: 0.85,
    keywords: 'CRISPR, gene editing, genomics, off-target effects'
  }
];

const mockResearchPlans: ResearchPlans[] = [
  {
    _id: 'plan_001',
    _createdDate: new Date('2024-01-01'),
    _updatedDate: new Date('2024-01-15'),
    planTitle: 'Quantum Computing for Drug Discovery',
    goal: 'Develop quantum algorithms to accelerate molecular docking simulations and identify novel drug candidates.',
    methodology: 'Implement variational quantum eigensolver (VQE) algorithms on superconducting qubit systems to calculate molecular energy landscapes.',
    keyMilestones: 'Algorithm development, quantum hardware validation, benchmarking against classical methods, drug candidate identification.',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-12-31'),
    status: 'Active',
    planSummary: 'Leveraging quantum computing to revolutionize pharmaceutical research.'
  },
  {
    _id: 'plan_002',
    _createdDate: new Date('2024-01-05'),
    _updatedDate: new Date('2024-01-15'),
    planTitle: 'AI-Powered Climate Modeling',
    goal: 'Create neural network models to improve climate change prediction accuracy and identify intervention strategies.',
    methodology: 'Train deep learning models on historical climate data, satellite imagery, and ocean temperature measurements.',
    keyMilestones: 'Data collection and preprocessing, model architecture design, validation against historical events, prediction system deployment.',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-06-30'),
    status: 'Planning',
    planSummary: 'Advanced AI for climate change prediction and mitigation strategies.'
  }
];

const mockAgents: IntelligentAgents[] = [
  {
    _id: 'agent_001',
    _createdDate: new Date('2024-01-01'),
    _updatedDate: new Date('2024-01-15'),
    name: 'Dr. Quantum',
    specialization: 'Quantum Physics',
    status: 'Active',
    description: 'Specialized AI agent for quantum mechanical calculations and quantum algorithm development. Expertise in quantum chemistry and quantum information theory.',
    agentImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop',
    creationDate: new Date('2023-12-01')
  },
  {
    _id: 'agent_002',
    _createdDate: new Date('2024-01-02'),
    _updatedDate: new Date('2024-01-15'),
    name: 'BioNexus',
    specialization: 'Computational Biology',
    status: 'Active',
    description: 'AI agent focused on biological data analysis, protein structure prediction, and genomic sequence analysis. Integrates multiple biological databases.',
    agentImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=300&fit=crop',
    creationDate: new Date('2023-11-15')
  },
  {
    _id: 'agent_003',
    _createdDate: new Date('2024-01-03'),
    _updatedDate: new Date('2024-01-15'),
    name: 'NeuralForge',
    specialization: 'Machine Learning',
    status: 'Training',
    description: 'Advanced machine learning agent capable of developing novel neural architectures and optimizing deep learning models for scientific applications.',
    agentImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=300&fit=crop',
    creationDate: new Date('2024-01-10')
  },
  {
    _id: 'agent_004',
    _createdDate: new Date('2024-01-04'),
    _updatedDate: new Date('2024-01-15'),
    name: 'ChemSolver',
    specialization: 'Computational Chemistry',
    status: 'Active',
    description: 'Specialized in molecular dynamics simulations, reaction pathway analysis, and chemical property prediction using quantum mechanical methods.',
    agentImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=300&fit=crop',
    creationDate: new Date('2023-12-20')
  }
];

const mockTools: IntelligentTools[] = [
  {
    _id: 'tool_001',
    _createdDate: new Date('2024-01-01'),
    _updatedDate: new Date('2024-01-15'),
    toolName: 'Quantum Simulator Pro',
    description: 'High-performance quantum circuit simulator with support for up to 50 qubits and advanced noise modeling.',
    integrationDetails: 'RESTful API with Python SDK, supports QASM and custom quantum gate definitions. Real-time visualization of quantum states.',
    toolType: 'Analysis',
    developer: 'Quantum Computing Lab',
    documentationUrl: 'https://docs.quantum-simulator.com',
    version: '3.2.1'
  },
  {
    _id: 'tool_002',
    _createdDate: new Date('2024-01-02'),
    _updatedDate: new Date('2024-01-15'),
    toolName: 'BioData Pipeline',
    description: 'Automated data processing pipeline for genomic and proteomic analysis with cloud-based scalability.',
    integrationDetails: 'Docker containers with Kubernetes orchestration. Supports FASTQ, BAM, and VCF file formats. Real-time processing monitoring.',
    toolType: 'Database',
    developer: 'Bioinformatics Institute',
    documentationUrl: 'https://biodata.docs.io',
    version: '2.8.0'
  },
  {
    _id: 'tool_003',
    _createdDate: new Date('2024-01-03'),
    _updatedDate: new Date('2024-01-15'),
    toolName: 'Neural Architecture Search',
    description: 'Automated neural network architecture optimization using evolutionary algorithms and reinforcement learning.',
    integrationDetails: 'Python library with TensorFlow and PyTorch support. GPU acceleration for rapid architecture evaluation.',
    toolType: 'API',
    developer: 'AI Research Group',
    documentationUrl: 'https://nas-ai.github.io',
    version: '1.5.2'
  }
];

const mockKnowledgeConcepts: KnowledgeNetworkConcepts[] = [
  {
    _id: 'concept_001',
    _createdDate: new Date('2024-01-01'),
    _updatedDate: new Date('2024-01-15'),
    conceptName: 'Quantum Supremacy',
    definition: 'The point at which quantum computers can solve problems that classical computers practically cannot.',
    relatedConcepts: 'Quantum Entanglement, Quantum Computing, Qubit, Quantum Algorithm',
    conceptType: 'Theory',
    keywords: 'quantum, computing, supremacy, advantage',
    sourceUrl: 'https://www.nature.com/articles/nature18672'
  },
  {
    _id: 'concept_002',
    _createdDate: new Date('2024-01-02'),
    _updatedDate: new Date('2024-01-15'),
    conceptName: 'CRISPR-Cas9',
    definition: 'A revolutionary gene-editing technology that allows precise modification of DNA sequences in living organisms.',
    relatedConcepts: 'Gene Editing, Genetic Engineering, Molecular Biology, DNA Repair',
    conceptType: 'Technology',
    keywords: 'CRISPR, gene editing, DNA, molecular biology',
    sourceUrl: 'https://www.science.org/content/337-6096-816'
  },
  {
    _id: 'concept_003',
    _createdDate: new Date('2024-01-03'),
    _updatedDate: new Date('2024-01-15'),
    conceptName: 'Deep Learning',
    definition: 'A subset of machine learning using neural networks with multiple layers to progressively extract higher-level features from raw input.',
    relatedConcepts: 'Neural Networks, Machine Learning, Artificial Intelligence, Backpropagation',
    conceptType: 'Methodology',
    keywords: 'deep learning, neural networks, AI, machine learning',
    sourceUrl: 'https://www.nature.com/articles/nature14539'
  }
];

const mockVisualizations: VisualizationAnalysis[] = [
  {
    _id: 'viz_001',
    _createdDate: new Date('2024-01-01'),
    _updatedDate: new Date('2024-01-15'),
    title: 'Quantum Computing Progress Timeline',
    visualizationImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
    summary: 'Interactive timeline showing the evolution of quantum computing from theoretical concepts to practical implementations.',
    analysisDate: new Date('2024-01-10'),
    sourceUrl: 'https://quantum-computing-timeline.demo',
    keyMetrics: '50+ quantum computers, 1000+ research papers, 15 major breakthroughs'
  },
  {
    _id: 'viz_002',
    _createdDate: new Date('2024-01-02'),
    _updatedDate: new Date('2024-01-15'),
    title: 'AI Research Collaboration Network',
    visualizationImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
    summary: 'Network graph mapping collaborative relationships between AI research institutions and their impact on innovation.',
    analysisDate: new Date('2024-01-08'),
    sourceUrl: 'https://ai-collaboration-network.demo',
    keyMetrics: '500+ institutions, 10,000+ collaborations, 25 countries'
  }
];

// Mock data service class
export class MockDataService {
  static async getAll<T>(collection: string): Promise<{ items: T[] }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    switch (collection) {
      case 'scientificinsights':
        return { items: mockInsights as T[] };
      case 'researchplans':
        return { items: mockResearchPlans as T[] };
      case 'intelligentagents':
        return { items: mockAgents as T[] };
      case 'intelligenttools':
        return { items: mockTools as T[] };
      case 'knowledgenetworkconcepts':
        return { items: mockKnowledgeConcepts as T[] };
      case 'visualizationanalysis':
        return { items: mockVisualizations as T[] };
      default:
        return { items: [] };
    }
  }
  
  static async getById<T>(collection: string, id: string): Promise<T | null> {
    const { items } = await this.getAll<T>(collection);
    return items.find((item: any) => item._id === id) || null;
  }
}

// Export entity types for use in components
export type {
  ScientificInsights,
  ResearchPlans,
  IntelligentAgents,
  IntelligentTools,
  KnowledgeNetworkConcepts,
  VisualizationAnalysis
};