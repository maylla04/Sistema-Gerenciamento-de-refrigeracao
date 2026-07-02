import { prisma } from "@/lib/db";

async function main() {
  const user = await prisma.user.findFirst();

  console.log(user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });