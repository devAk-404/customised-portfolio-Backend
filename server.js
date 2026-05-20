require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.kyucbpo.mongodb.net/portfolio-db?appName=Cluster0';

const statSchema = new mongoose.Schema({ icon: String, value: String, label: String }, { _id: false });
const workHistorySchema = new mongoose.Schema({ company: String, role: String, period: String, desc: String }, { _id: false });
const skillsSchema = new mongoose.Schema({ frontend: [String], backend: [String] }, { _id: false });
const socialsSchema = new mongoose.Schema({ github: String, linkedin: String, twitter: String, email: String }, { _id: false });

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  tagline: String,
  resume: String,
  bio: String,
  avatar: String,
  stats: [statSchema],
  skills: skillsSchema,
  workHistory: [workHistorySchema],
  socials: socialsSchema,
  award: String
});

const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  icon: String,
  title: String,
  desc: String
});

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  tech: String,
  stars: Number,
  forks: Number,
  image: String,
  liveDemo: String,
  repo: String,
  visibility: String,
  variant: String
});

const Profile = mongoose.model('Profile', profileSchema);
const Service = mongoose.model('Service', serviceSchema);
const Project = mongoose.model('Project', projectSchema);

const defaultData = {
  profile: {
    name: 'Adarsh Kumar',
    title: 'Full Stack Developer',
    tagline: 'Building Digital Solutions',
    resume: '/Adarsh_CV_FullStack.pdf',
    bio: 'Full Stack Software Developer with 5 years of experience building scalable backend systems, REST APIs, microservices, and modern frontend applications with React, Angular, Node.js, and cloud platforms.',
    avatar: null,
    stats: [
      { icon: 'code', value: '5+', label: 'Years Coding' },
      { icon: 'folder', value: '450+', label: 'Projects Completed' },
      { icon: 'users', value: '135+', label: 'Happy Clients' },
      { icon: 'shield', value: '100%', label: 'Code Quality' }
    ],
    skills: {
      frontend: ['React & Next.js', 'TypeScript & JavaScript', 'Tailwind CSS'],
      backend: ['Node.js & Express', 'MongoDB & PostgreSQL', 'AWS & Docker']
    },
    workHistory: [
      { company: 'RIMES, Chennai', role: 'Full Stack Developer', period: 'June 2025 - Feb 2026', desc: 'Developed and maintained a Weather & Disaster Management platform using Angular, Node.js, PostgreSQL, Leaflet.js, REST APIs, JWT, and cloud services for real-time monitoring and district-level workflows.' },
      { company: 'Optimiser, Delhi', role: 'Software Engineer', period: 'June 2023 - April 2025', desc: 'Built scalable MERN and Spring Boot applications, CRM modules, drag-and-drop page builders, calendar integrations, video workflows with AWS Lambda/S3/FFmpeg, and CI/CD deployments on AWS.' },
      { company: 'Tata Consultancy Services, Delhi', role: 'Assistant System Engineer', period: 'Aug 2021 - Jul 2023', desc: 'Led backend development for e-commerce systems, migrated legacy services to Node.js, built catalog/cart/billing/payment APIs, automated email workflows, and maintained Spring Boot ALM systems.' }
    ],
    socials: { github: '#', linkedin: '#', twitter: '#', email: 'adarsh.rk518@gmail.com' },
    award: '5 Stars in HackerRank Problem Solving and Core Java'
  },
  services: [
    { id: uuidv4(), icon: 'code', title: 'Web Development (Frontend + Backend)', desc: 'Building responsive, high-performance web applications using React, Next.js, Node.js, and Express.' },
    { id: uuidv4(), icon: 'api', title: 'API Development & Integration', desc: 'Designing and implementing robust, secure RESTful and GraphQL APIs, with seamless integration to third-party services.' },
    { id: uuidv4(), icon: 'database', title: 'Database Design & Optimization', desc: 'Creating efficient database architectures with MongoDB, PostgreSQL, and MySQL, optimized for performance.' },
    { id: uuidv4(), icon: 'cloud', title: 'DevOps & Deployment', desc: 'Streamlining development pipelines with Docker, AWS, and CI/CD workflows to ensure reliable, automated deployments.' },
    { id: uuidv4(), icon: 'palette', title: 'UI/UX Implementation', desc: 'Translating designs into intuitive, pixel-perfect interfaces using Tailwind CSS and modern frontend frameworks.' },
    { id: uuidv4(), icon: 'wrench', title: 'Maintenance & Support', desc: 'Providing ongoing support, bug fixes, and performance enhancements to keep your applications running smoothly.' }
  ],
  projects: [
    { id: uuidv4(), title: 'Streaming Application', description: 'A premium video streaming platform with upload processing workers, FFmpeg transcoding, Video.js playback, AWS S3 storage, thumbnail generation, and responsive movie-style browsing.', tech: 'Video.js', stars: 164, forks: 38, image: '/streaming-application.png', liveDemo: '#', repo: '#', visibility: 'Public', variant: 'streaming' },
    { id: uuidv4(), title: 'Plumbing Business Web App', description: 'A clean responsive service-business website for plumbing leads, service discovery, Google-review trust signals, appointment booking, enquiry flows, and customer conversion.', tech: 'Next.js', stars: 128, forks: 45, image: '/plumbing-business-web-app.png', liveDemo: '#', repo: '#', visibility: 'Public' },
    { id: uuidv4(), title: 'Loan CRM', description: 'A responsive loan management CRM dashboard for tracking leads, applications, approval status, disbursed amounts, activities, tasks, reminders, and document workflows.', tech: 'React', stars: 92, forks: 30, image: '/loan-crm.png', liveDemo: '#', repo: '#', visibility: 'Public' },
    { id: uuidv4(), title: 'Social Dashboard', description: 'A dashboard for tracking social media analytics and engagement, providing actionable insights for marketing teams.', tech: 'Python', stars: 76, forks: 22, image: null, liveDemo: '#', repo: '#', visibility: 'Public' },
    { id: uuidv4(), title: 'Real Estate Operations Platform', description: 'An under-development real estate workspace for property listings, lead intake, owner and buyer pipelines, document tracking, site visits, and deal progress visibility.', tech: 'Next.js', stars: 0, forks: 0, image: '/under-development.svg', liveDemo: '#', repo: '#', visibility: 'In Development' },
    { id: uuidv4(), title: 'E-Commerce Platform', description: 'An under-development commerce platform with product catalog, cart, checkout, order management, payment workflow, and responsive storefront experience.', tech: 'React', stars: 0, forks: 0, image: '/under-development.svg', liveDemo: '#', repo: '#', visibility: 'In Development' }
  ]
};

async function initializeDefaultData() {
  const [profileCount, serviceCount, projectCount] = await Promise.all([
    Profile.countDocuments(),
    Service.countDocuments(),
    Project.countDocuments()
  ]);

  if (!profileCount) await Profile.create(defaultData.profile);
  if (!serviceCount) await Service.insertMany(defaultData.services);
  if (!projectCount) await Project.insertMany(defaultData.projects);
}

async function loadPortfolio() {
  const [profile, services, projects] = await Promise.all([
    Profile.findOne().lean(),
    Service.find().lean(),
    Project.find().lean()
  ]);

  return {
    profile: profile || defaultData.profile,
    services: services.length ? services : defaultData.services,
    projects: projects.length ? projects : defaultData.projects
  };
}

app.get('/api/portfolio', async (req, res) => {
  try {
    const portfolio = await loadPortfolio();
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load portfolio data' });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, { $set: req.body }, { new: true, upsert: true });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.put('/api/profile/avatar', async (req, res) => {
  try {
    const { image } = req.body;
    await Profile.findOneAndUpdate({}, { avatar: image }, { new: true, upsert: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update avatar' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().lean();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = await Project.create({ id: uuidv4(), ...req.body });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const result = await Project.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await initializeDefaultData();

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

startServer();
