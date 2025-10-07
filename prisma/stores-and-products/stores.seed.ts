import { PrismaClient, UserType } from '@prisma/client';

// 판매자 유저
const BUSINESS_USERS = [
  {
    name: '판매자1',
    user_type: UserType.BUSINESS,
    phonenumber: '01012345678',
    profile: null,
    kakao_client_id: null,
    admin_email: null,
    admin_password: null,
  },
  {
    name: '판매자2',
    user_type: UserType.BUSINESS,
    phonenumber: '01012344321',
    profile: null,
    kakao_client_id: null,
    admin_email: null,
    admin_password: null,
  },
  {
    name: '판매자3',
    user_type: UserType.BUSINESS,
    phonenumber: '01012348765',
    profile: null,
    kakao_client_id: null,
    admin_email: null,
    admin_password: null,
  },
  {
    name: '판매자4',
    user_type: UserType.BUSINESS,
    phonenumber: '01012344567',
    profile: null,
    kakao_client_id: null,
    admin_email: null,
    admin_password: null,
  },
  {
    name: '판매자5',
    user_type: UserType.BUSINESS,
    phonenumber: '01012346789',
    profile: null,
    kakao_client_id: null,
    admin_email: null,
    admin_password: null,
  },
] as const;

// 가게
const STORES = [
  {
    // store_id = 1
    name: '스웨이드 베이커리 청담',
    business_number: '0123456789', // 10자리 (000-00-00000)
    address: '서울 강남구 도산대로62길 26 1층',
    phonenumber: '050714494422', // 0507-1448-4422
    contact_url: 'https://www.instagram.com/suede.bakery',
    user_id: BigInt(1),
  },
  {
    // store_id = 2
    name: '동구리 제과',
    business_number: '1234567890', // 10자리 (000-00-00000)
    address: '경기 안산시 상록구 박우물로 26 중앙빌딩 1층',
    phonenumber: '07080188920', // 070-8018-8920
    user_id: BigInt(2),
  },
  {
    // store_id = 3
    name: '케이크얌',
    business_number: '1231212345', // 10자리 (000-00-00000)
    address: '전남 광양시 광양읍 칠성리 36-11',
    phonenumber: '050713049179', // 0507-1304-9179
    contact_url: 'https://pf.kakao.com/_zDxjcb',
    user_id: BigInt(3),
  },
  {
    // store_id = 4
    name: '라부아뜨엘',
    business_number: '3213254321', // 10자리 (000-00-00000)
    address: '대구 수성구 지범로 248-6 1층',
    phonenumber: '050714840458', // 0507-1484-0458
    contact_url: 'https://pf.kakao.com/_xoxjmyG',
    user_id: BigInt(4),
  },
  {
    // store_id = 5
    name: '포스트 케이크',
    business_number: '0987654321', // 10자리 (000-00-00000)
    address: '서울 마포구 월드컵북로16길 64 1층',
    phonenumber: '050714313782', // 0507-1431-3782
    contact_url: 'https://www.instagram.com/postcake_official',
    user_id: BigInt(5),
  },
] as const;

// 영업시간 7일
// time-slot.seed.ts가 사전에 데이터셋이 되어야함.
const BUSINNESS_OPERATIONS = [
  // 스웨이드베이커리(store_id = 1)
  {
    store_id: BigInt(1),
    day_of_week: 0, // 월
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },
  {
    store_id: BigInt(1),
    day_of_week: 1, // 화
    day_off: true,
  },
  {
    store_id: BigInt(1),
    day_of_week: 2, // 수
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },
  {
    store_id: BigInt(1),
    day_of_week: 3, // 목
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },
  {
    store_id: BigInt(1),
    day_of_week: 4, // 금
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },
  {
    store_id: BigInt(1),
    day_of_week: 5, // 토
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },
  {
    store_id: BigInt(1),
    day_of_week: 6, // 일
    day_off: false,
    open_time_at: 21, // 10:00
    close_time_at: 41, // 20:00
  },

  // 동구리제과(store_id = 2)
  {
    store_id: BigInt(2),
    day_of_week: 0, // 월
    day_off: false,
    open_time_at: 19, // 09:00
    close_time_at: 39, // 19:00
  },
  {
    store_id: BigInt(2),
    day_of_week: 1, // 화
    day_off: false,
    open_time_at: 19, // 09:00
    close_time_at: 39, // 19:00
  },
  {
    store_id: BigInt(2),
    day_of_week: 2, // 수
    day_off: false,
    open_time_at: 19, // 09:00
    close_time_at: 39, // 19:00
  },
  {
    store_id: BigInt(2),
    day_of_week: 3, // 목
    day_off: false,
    open_time_at: 19, // 09:00
    close_time_at: 39, // 19:00
  },
  {
    store_id: BigInt(2),
    day_of_week: 4, // 금
    day_off: false,
    open_time_at: 19, // 09:00
    close_time_at: 39, // 19:00
  },
  {
    store_id: BigInt(2),
    day_of_week: 5, // 토
    day_off: true,
  },
  {
    store_id: BigInt(2),
    day_of_week: 6, // 일
    day_off: true,
  },
  // 케이크얌 (store_id = 3)
  {
    store_id: BigInt(3),
    day_of_week: 0, // 월
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 1, // 화
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 2, // 수
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 3, // 목
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 4, // 금
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 5, // 토
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(3),
    day_of_week: 6, // 일
    day_off: false,
    open_time_at: 23, // 11:00
    close_time_at: 45, // 22:00
  },
  // 라부아뜨엘 (store_id = 4)
  {
    store_id: BigInt(4),
    day_of_week: 0, // 월
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 1, // 화
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 2, // 수
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 3, // 목
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 4, // 금
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 5, // 토
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  {
    store_id: BigInt(4),
    day_of_week: 6, // 일
    day_off: false,
    open_time_at: 17, // 08:00
    close_time_at: 45, // 22:00
  },
  // 포스트케이크 (store_id = 5)
  {
    store_id: BigInt(5),
    day_of_week: 0, // 월
    day_off: true,
  },
  {
    store_id: BigInt(5),
    day_of_week: 1, // 화
    day_off: false,
    open_time_at: 25, // 12:00
    close_time_at: 38, // 18:30
  },
  {
    store_id: BigInt(5),
    day_of_week: 2, // 수
    day_off: false,
    open_time_at: 25, // 12:00
    close_time_at: 38, // 18:30
  },
  {
    store_id: BigInt(5),
    day_of_week: 3, // 목
    day_off: false,
    open_time_at: 25, // 12:00
    close_time_at: 38, // 18:30
  },
  {
    store_id: BigInt(5),
    day_of_week: 4, // 금
    day_off: false,
    open_time_at: 25, // 12:00
    close_time_at: 38, // 18:30
  },
  {
    store_id: BigInt(5),
    day_of_week: 5, // 토
    day_off: false,
    open_time_at: 25, // 12:00
    close_time_at: 38, // 18:30
  },
  {
    store_id: BigInt(5),
    day_of_week: 6, // 일
    day_off: true,
  },
] as const;

async function seedBusinessUsers(prisma: PrismaClient) {
  console.log('🌱 Users: 판매자 유저 seed 데이터 삽입중...');
  const existingUsers = await prisma.users.count({
    where: { user_type: UserType.BUSINESS },
  });

  if (existingUsers > 0) {
    console.log('⏭️  이미 판매자 유저 데이터가 존재하여 건너뜁니다.');
    return;
  } else {
    await prisma.$transaction(async (tx) => {
      for (const user of BUSINESS_USERS) {
        await tx.users.create({ data: user });
      }
    });
    console.log(
      `✅ Users: ${BUSINESS_USERS.length} 개의 판매자 유저데이터 추가완료`,
    );
  }
  console.log('✅ Users(판매자유저) 테이블 seeding 완료');
}

async function seedStores(prisma: PrismaClient) {
  console.log('🌱 Stores: 상점 seed 데이터 삽입중...');
  const existingStores = await prisma.stores.count();

  if (existingStores > 0) {
    console.log('⏭️  이미 상점 데이터가 존재하여 건너뜁니다.');
    return;
  } else {
    await prisma.$transaction(async (tx) => {
      for (const store of STORES) {
        await tx.stores.create({ data: store });
      }
    });
    console.log(`✅ Stores: ${STORES.length} 개의 상점 데이터 추가완료`);
  }
  console.log('✅ Stores 테이블 seeding 완료');
}

async function seedBusinessOperations(prisma: PrismaClient) {
  console.log(
    '🌱 BusinessOperations: 상점 운영시간 정보 seed 데이터 삽입중...',
  );

  const timeSlotsCount = await prisma.timeSlots.count();
  if (timeSlotsCount === 0) {
    console.error('❌ TimeSlots 데이터가 없습니다!');
    return;
  }

  const existingStores = await prisma.businessOperations.count();
  if (existingStores > 0) {
    console.log('⏭️  이미 상점 운영시간 정보 데이터가 존재하여 건너뜁니다.');
    return;
  } else {
    await prisma.$transaction(async (tx) => {
      for (const bo of BUSINNESS_OPERATIONS) {
        if (bo.day_off) {
          // day_off ===  true 일경우
          await tx.businessOperations.create({
            data: {
              store_id: bo.store_id,
              day_of_week: bo.day_of_week,
              day_off: true,
            },
          });
        } else {
          // day_off ===  false 일경우
          await tx.businessOperations.create({
            data: {
              store_id: bo.store_id,
              day_of_week: bo.day_of_week,
              day_off: false,
              open_time_at: bo.open_time_at,
              close_time_at: bo.close_time_at,
            },
          });
        }
      }
    });
    console.log(
      `✅ BusinessOperations: ${BUSINNESS_OPERATIONS.length} 개의 상점 운영시간 정보 데이터 추가완료`,
    );
  }
  console.log('✅ BusinessOperations 테이블 seeding 완료');
}

export default async function seed(prisma: PrismaClient) {
  // 판매자 유저
  await seedBusinessUsers(prisma);

  // 상점
  await seedStores(prisma);

  // 상점 운영시간 정보
  await seedBusinessOperations(prisma);
}
