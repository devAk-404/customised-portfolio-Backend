require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.kyucbpo.mongodb.net/portfolio-db?appName=Cluster0';
const dataFile = path.join(__dirname, 'data.json');
const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

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

async function seed() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    console.log('Seeding MongoDB using data.json...');

    await Profile.updateOne({}, data.profile, { upsert: true });
    await Service.deleteMany({});
    await Project.deleteMany({});

    if (Array.isArray(data.services) && data.services.length) {
      await Service.insertMany(data.services);
    }

    if (Array.isArray(data.projects) && data.projects.length) {
      await Project.insertMany(data.projects);
    }

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
