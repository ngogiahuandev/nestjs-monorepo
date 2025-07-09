import { seedUsers } from './seeds/user.seed';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  try {
    await seedUsers();
    console.log('User seeding completed.');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
