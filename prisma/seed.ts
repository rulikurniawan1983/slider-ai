import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  // Create super admin user
  const admin = await db.user.upsert({
    where: { email: "admin@sliderai.com" },
    update: {},
    create: {
      email: "admin@sliderai.com",
      name: "Super Admin",
      password: passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  // Create workspace for admin
  const workspace = await db.workspace.create({
    data: {
      name: "Default Workspace",
      slug: "default",
      ownerId: admin.id,
    },
  });

  // Link user to workspace
  await db.user.update({
    where: { id: admin.id },
    data: { workspaceId: workspace.id },
  });

  // Create workspace member
  await db.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: admin.id,
      role: "OWNER",
    },
  });

  // Create built-in agents
  const agents = [
    {
      name: "General Agent",
      description: "Assistant umum untuk tugas sehari-hari",
      prompt: "Anda adalah Assistant umum yang membantu pengguna dengan berbagai tugas.",
      model: "gpt-4o-mini",
      temperature: 0.7,
    },
    {
      name: "Research Agent",
      description: "Agent untuk riset dan penelitian mendalam",
      prompt: "Anda adalah Research Agent yang spesialis dalam riset dan analisis informasi.",
      model: "gpt-4o",
      temperature: 0.5,
    },
    {
      name: "Customer Support Agent",
      description: "Agent untuk layanan pelanggan",
      prompt: "Anda adalah Customer Support Agent yang membantu menjawab pertanyaan pelanggan.",
      model: "gpt-4o-mini",
      temperature: 0.3,
    },
    {
      name: "Sales Agent",
      description: "Agent untuk penjualan dan pemasaran",
      prompt: "Anda adalah Sales Agent yang membantu dalam proses penjualan.",
      model: "gpt-4o-mini",
      temperature: 0.6,
    },
    {
      name: "Marketing Agent",
      description: "Agent untuk strategi pemasaran",
      prompt: "Anda adalah Marketing Agent yang membantu membuat strategi pemasaran.",
      model: "gpt-4o-mini",
      temperature: 0.8,
    },
    {
      name: "Report Analyst Agent",
      description: "Agent untuk menganalisis laporan",
      prompt: "Anda adalah Report Analyst Agent yang menganalisis laporan dan data.",
      model: "gpt-4o",
      temperature: 0.4,
    },
    {
      name: "Knowledge Base Agent",
      description: "Agent untuk mengakses basis pengetahuan",
      prompt: "Anda adalah Knowledge Base Agent yang membantu mencari informasi dari basis pengetahuan.",
      model: "gpt-4o-mini",
      temperature: 0.5,
    },
  ];

  for (const agent of agents) {
    await db.agent.create({
      data: {
        ...agent,
        workspaceId: workspace.id,
        isBuiltIn: true,
        isActive: true,
      },
    });
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
