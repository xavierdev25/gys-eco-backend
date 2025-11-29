import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Create Admin User
    const password = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password,
            name: 'Admin User',
            role: 'ADMIN',
        },
    });
    console.log({ admin });

    // Create Categories
    const electronics = await prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: {
            name: 'Electronics',
            slug: 'electronics',
        },
    });

    const clothing = await prisma.category.upsert({
        where: { slug: 'clothing' },
        update: {},
        create: {
            name: 'Clothing',
            slug: 'clothing',
        },
    });
    console.log({ electronics, clothing });

    // Create Products
    const product1 = await prisma.product.create({
        data: {
            name: 'Smartphone X',
            slug: 'smartphone-x',
            description: 'The latest smartphone',
            price: 999.99,
            stock: 50,
            categoryId: electronics.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: 'T-Shirt',
            slug: 't-shirt',
            description: 'Cotton T-Shirt',
            price: 19.99,
            stock: 100,
            categoryId: clothing.id,
        },
    });
    console.log({ product1, product2 });

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
