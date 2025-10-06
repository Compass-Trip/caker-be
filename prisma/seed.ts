import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function findSeedFiles(dir: string): Promise<string[]> {
  const seedFiles: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 재귀적으로 하위 디렉터리 탐색
      seedFiles.push(...(await findSeedFiles(filePath)));
    } else if (file.endsWith('.seed.ts')) {
      seedFiles.push(filePath);
    }
  }
  return seedFiles;
}

async function main() {
  // CLI 인자를 받는다 (예: npm run seed -- event-categories)
  const targetSeed = process.argv[2];
  if (targetSeed) {
    console.log(`🌱 선택적 Seeding 시작: ${targetSeed}\n`);
  } else {
    console.log('🌱 전체 Seeding 시작...\n');
  }

  try {
    // prisma 디렉터리 내 모든 seed파일을 찾는다.
    const prismaDir = __dirname;
    const seedFiles = await findSeedFiles(prismaDir);
    const seedSelfTs = path.join(prismaDir, 'seed.ts');

    // seed.ts 자기자신은 제외
    let filteredSeedFiles = seedFiles.filter((file) => {
      const resolved = path.resolve(file);
      return resolved !== path.resolve(seedSelfTs);
    });

    // 특정 seed파일만 실행하도록 필터링
    if (targetSeed) {
      filteredSeedFiles = filteredSeedFiles.filter((file) =>
        file.includes(targetSeed),
      );

      if (filteredSeedFiles.length === 0) {
        console.error(
          `❌ "${targetSeed}"와 일치하는 seed 파일을 찾을 수 없습니다.`,
        );
        process.exit(1);
      }
    }

    console.log(`📂 실행할 seed 파일: ${filteredSeedFiles.length}개\n`);
    for (const seedFile of filteredSeedFiles) {
      const relativePath = path.relative(prismaDir, seedFile);
      console.log(`▶️  실행 중: ${relativePath}`);
      try {
        const seedModule = await import(seedFile);
        const seedFunction = seedModule.default || seedModule.seed;
        if (typeof seedFunction === 'function') {
          await seedFunction(prisma);
          console.log(`✅ 완료: ${relativePath}\n`);
        } else {
          console.warn(`⚠️  건너뜀: ${relativePath} (seed 함수 없음)\n`);
        }
      } catch (error) {
        console.error(`❌ 실패: ${relativePath}`);
        console.error(error);
        console.log('\n');
      }
    }
    console.log('✨ 모든 seeding 완료!');
  } catch (error) {
    console.error('❌ Seeding 중 오류 발생:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
