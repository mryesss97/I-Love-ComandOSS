import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sentences = [
  { text: "I like to read books every night." },
  { text: "She is going to the market now." },
  { text: "We love listening to English songs." },
  { text: "He practices speaking English daily." },
  { text: "They are walking in the park." },
];

async function main() {
  for (const s of sentences) {
    await prisma.sentence.create({ data: s });
  }
}

main().finally(() => prisma.$disconnect());