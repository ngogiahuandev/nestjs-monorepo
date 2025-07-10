import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const users = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
  },
  {
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
  },
  {
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
  },
  {
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
  },
  {
    name: 'Fiona Gallagher',
    email: 'fiona.gallagher@example.com',
  },
  {
    name: 'George Miller',
    email: 'george.miller@example.com',
  },
  {
    name: 'Hannah Lee',
    email: 'hannah.lee@example.com',
  },
  {
    name: 'Ivan Petrov',
    email: 'ivan.petrov@example.com',
  },
  {
    name: 'Julia Roberts',
    email: 'julia.roberts@example.com',
  },
];

export async function seedUsers() {
  const hashedPassword = await bcrypt.hash('12345678', 10);
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: users.map((user) => ({
      ...user,
      password: hashedPassword,
    })),
  });
}
