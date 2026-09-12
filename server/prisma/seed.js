import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed do banco de dados...');

  // 1. Criar Usuário Administrador
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@delivery.com' },
    update: {},
    create: {
      name: 'Administrador Delivery',
      email: 'admin@delivery.com',
      password: adminPassword,
      phone: '(11) 99999-9999',
      role: 'ADMIN',
    },
  });
  console.log(`Admin verificado/criado: ${admin.email}`);

  // 3. Criar Categorias Iniciais
  const combos = await prisma.category.upsert({
    where: { name: 'Combos' },
    update: {},
    create: {
      name: 'Combos',
      icon: 'combo',
      order: 1,
      active: true,
    },
  });

  const pizzas = await prisma.category.upsert({
    where: { name: 'Pizzas' },
    update: {},
    create: {
      name: 'Pizzas',
      icon: 'pizza',
      order: 2,
      active: true,
    },
  });

  const bebidas = await prisma.category.upsert({
    where: { name: 'Bebidas' },
    update: {},
    create: {
      name: 'Bebidas',
      icon: 'drink',
      order: 3,
      active: true,
    },
  });

  // 4. Criar Produtos de Exemplo
  const produtos = [
    {
      name: 'Combo 1',
      description: '2 Pizzas Grandes + Refrigerante 2L',
      price: 120.0,
      categoryId: combos.id,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Pizza Calabresa Especial',
      description: 'Molho de tomate artesanal, mussarela, fatias de calabresa defumada e cebola fatiada.',
      price: 54.0,
      categoryId: pizzas.id,
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Coca-Cola Lata 350ml',
      description: 'Refrigerante gelado em lata 350ml.',
      price: 6.5,
      categoryId: bebidas.id,
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80',
    },
  ];

  for (const prod of produtos) {
    const existing = await prisma.product.findFirst({ where: { name: prod.name } });
    if (!existing) {
      await prisma.product.create({ data: prod });
      console.log(`Produto criado: ${prod.name}`);
    }
  }

  // 5. Configurações Iniciais da Loja
  const settings = [
    { key: 'store_name', value: 'Delivery Burguer & Pizza', description: 'Nome da loja' },
    { key: 'delivery_fee', value: '7.50', description: 'Taxa fixa de entrega em R$' },
    { key: 'is_open', value: 'true', description: 'Status de abertura da loja' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
