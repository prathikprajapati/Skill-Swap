import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const skills = [
  // Programming Languages
  { name: 'JavaScript', category: 'Programming' },
  { name: 'TypeScript', category: 'Programming' },
  { name: 'Python', category: 'Programming' },
  { name: 'Java', category: 'Programming' },
  { name: 'C++', category: 'Programming' },
  { name: 'C#', category: 'Programming' },
  { name: 'Go', category: 'Programming' },
  { name: 'Rust', category: 'Programming' },
  { name: 'PHP', category: 'Programming' },
  { name: 'Ruby', category: 'Programming' },

  // Web Development
  { name: 'React', category: 'Web Development' },
  { name: 'Vue.js', category: 'Web Development' },
  { name: 'Angular', category: 'Web Development' },
  { name: 'Node.js', category: 'Web Development' },
  { name: 'Express.js', category: 'Web Development' },
  { name: 'Next.js', category: 'Web Development' },
  { name: 'HTML', category: 'Web Development' },
  { name: 'CSS', category: 'Web Development' },
  { name: 'SASS/SCSS', category: 'Web Development' },

  // Mobile Development
  { name: 'React Native', category: 'Mobile Development' },
  { name: 'Flutter', category: 'Mobile Development' },
  { name: 'iOS Development', category: 'Mobile Development' },
  { name: 'Android Development', category: 'Mobile Development' },

  // Data Science & AI
  { name: 'Machine Learning', category: 'Data Science' },
  { name: 'Data Analysis', category: 'Data Science' },
  { name: 'TensorFlow', category: 'Data Science' },
  { name: 'PyTorch', category: 'Data Science' },
  { name: 'Pandas', category: 'Data Science' },
  { name: 'NumPy', category: 'Data Science' },

  // DevOps & Cloud
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Azure', category: 'Cloud' },
  { name: 'Google Cloud', category: 'Cloud' },
  { name: 'CI/CD', category: 'DevOps' },
  { name: 'Linux', category: 'DevOps' },

  // Design
  { name: 'UI/UX Design', category: 'Design' },
  { name: 'Figma', category: 'Design' },
  { name: 'Adobe XD', category: 'Design' },
  { name: 'Photoshop', category: 'Design' },
  { name: 'Illustrator', category: 'Design' },

  // Other Skills
  { name: 'Project Management', category: 'Business' },
  { name: 'Agile/Scrum', category: 'Business' },
  { name: 'SQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Git', category: 'Tools' },
  { name: 'Testing', category: 'Quality Assurance' }
];

async function main() {
  console.log('Seeding skills...');

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
