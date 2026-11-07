import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Seed Customer User & Customer Profile
  const customerUser = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: 'password123',
      name: 'John Customer',
      role: Role.CUSTOMER,
      customer: {
        create: {
          phone: '+1234567890',
          address: '123 Main St, Springfield',
        },
      },
    },
    include: { customer: true },
  });

  console.log(`Seeded customer user with ID: ${customerUser.id}`);

  // 2. Seed Admin User & Admin Profile
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: 'password123',
      name: 'Sarah Admin',
      role: Role.ADMIN,
      admin: {
        create: {
          department: 'Custom Furniture Orders',
        },
      },
    },
    include: { admin: true },
  });

  console.log(`Seeded admin user with ID: ${adminUser.id}`);

  // 3. Seed Sample Category
  const furnitureCategory = await prisma.category.upsert({
    where: { name: 'Living Room' },
    update: {},
    create: {
      name: 'Living Room',
    },
  });

  console.log(`Seeded category with ID: ${furnitureCategory.id}`);

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

