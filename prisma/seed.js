const { PrismaClient } = require('../src/generated');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'nurillohxasanov@gmail.com';
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Nurilloh Xasanov',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      }
    });
    console.log(`Admin user created: ${adminEmail} / password: admin123`);
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
