import { PrismaClient } from '@prisma/client';

/* 이벤트별 카테고리 초기데이터(13개)*/
const EVENT_CATEGORIES = [
  {
    name: '생일',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/1.svg',
  },
  {
    name: '웨딩/결혼',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/2.svg',
  },
  {
    name: '돌잔치',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/3.svg',
  },
  {
    name: '기념일',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/4.svg',
  },
  {
    name: '졸업/입학',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/5.svg',
  },
  {
    name: '기업',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/6.svg',
  },
  {
    name: '시즌/홀리데이',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/7.svg',
  },
  {
    name: '캐릭터',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/8.svg',
  },
  {
    name: '과일',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/9.svg',
  },
  {
    name: '플라워',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/10.svg',
  },
  {
    name: '한입',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/11.svg',
  },
  {
    name: '도시락',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/12.svg',
  },
  {
    name: '포토',
    icon_image_url:
      'https://caker-be.s3.ap-northeast-2.amazonaws.com/event_categories/13.svg',
  },
] as const;

export default async function seed(prisma: PrismaClient) {
  console.log('🌱 EventCategories: 이벤트카테고리 데이터 삽입중...');

  // 기존데이터 확인 (중복방지)
  const existingCount = await prisma.eventCategories.count();

  if (existingCount > 0) {
    console.log('⏭️  이미 이벤트 카테고리 데이터가 존재하여 건너뜁니다.');
    return;
  }

  // 데이터 삽입: 순서를 보장하기 위해 하나씩 삽입
  for (const category of EVENT_CATEGORIES) {
    await prisma.eventCategories.create({
      data: category,
    });
  }

  console.log(
    `✅ EventCategories: ${EVENT_CATEGORIES.length}개의 이벤트 카테고리 추가완료`,
  );
}
