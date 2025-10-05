import { PrismaClient } from '@prisma/client';

/* 테마 & 디자인 - 초기데이터셋 */
const THEME_AND_DESIGN_CATEGORIES = [
  { name: '큐트' },
  { name: '미니멀/모던' },
  { name: '프리미엄/럭셔리' },
  { name: '3D입체' },
  { name: '내추럴/오가닉' },
];

export default async function seed(prisma: PrismaClient) {
  console.log('🌱 ThemeNDesignCategories: 이벤트카테고리 데이터 삽입중...');

  // 기존데이터 확인 (중복방지)
  const existingCount = await prisma.themeNDesignCategories.count();

  if (existingCount > 0) {
    console.log('⏭️ 이미 테마/디자인 카테고리 데이터가 존재하여 건너뜁니다.');
    return;
  }

  // 데이터 삽입: 순서를 보장하기 위해 하나씩 삽입
  for (const category of THEME_AND_DESIGN_CATEGORIES) {
    await prisma.themeNDesignCategories.create({
      data: category,
    });
  }

  console.log(
    `✅ ThemeNDesignCategories: ${THEME_AND_DESIGN_CATEGORIES.length}개의 이벤트 카테고리 추가완료`,
  );
}
