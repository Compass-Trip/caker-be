import { PrismaClient } from '@prisma/client';

const PRODUCT_OPTIONS = [
  // store_id = 1 / 스웨이드 베이커리 청담
  // product_id = 1 / 벌스데이 레터링 케이크
  {
    // product_option_id = 1
    product_id: 1,
    name: '케이크 사이즈',
    display_order: 0,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 2
    product_id: 1,
    name: '케이크 맛',
    display_order: 1,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 3
    product_id: 1,
    name: '디자인초 & 토퍼',
    display_order: 2,
    is_multiple: true,
    is_required: true,
  },
  {
    // product_option_id = 4
    product_id: 1,
    name: '케이크용 보냉가방',
    display_order: 3,
    is_multiple: false,
    is_required: true,
  },
  // product_id = 2 / 플라워캐롯케이크
  {
    // product_option_id = 5
    product_id: 2,
    name: '케이크 사이즈',
    display_order: 0,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 6
    product_id: 2,
    name: '케이크 맛',
    display_order: 1,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 7
    product_id: 2,
    name: '디자인초 & 토퍼',
    display_order: 2,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 8
    product_id: 2,
    name: '케이크용 보냉가방',
    display_order: 3,
    is_multiple: false,
    is_required: true,
  },
  // product_id = 3 / 하트 레터링 케이크
  {
    // product_option_id = 9
    product_id: 3,
    name: '케이크 사이즈',
    display_order: 0,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 10
    product_id: 3,
    name: '케이크 맛',
    display_order: 1,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 11
    product_id: 3,
    name: '디자인초 & 토퍼',
    display_order: 2,
    is_multiple: false,
    is_required: true,
  },
  {
    // product_option_id = 12
    product_id: 3,
    name: '케이크용 보냉가방',
    display_order: 3,
    is_multiple: false,
    is_required: true,
  },
];

const PRODUCT_OPTION_CHOICES = [
  // store_id = 1 / 스웨이드 베이커리 청담
  // product_id = 1 / 벌스데이 레터링 케이크
  // product_option_id = 1 / 케이크 사이즈
  {
    product_option_id: 1,
    name: '지름 10cm',
    display_order: 0,
    additional_price: 0,
  },
  // product_option_id = 2 / 케이크 맛
  {
    product_option_id: 2,
    name: '벌스데이 바닐라',
    display_order: 0,
    additional_price: 0,
  },
  // product_option_id = 3 / 디자인초 & 토퍼
  {
    product_option_id: 3,
    name: '기본 생일초',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 3,
    name: '해피벌스데이 토퍼(색상랜덤)',
    display_order: 1,
    additional_price: 12000,
  },
  {
    product_option_id: 3,
    name: '케이크픽 & 디자인초 세트',
    display_order: 2,
    additional_price: 9000,
  },
  {
    product_option_id: 4,
    name: '곰돌이초 + 라이터세트',
    display_order: 3,
    additional_price: 4000,
  },
  {
    product_option_id: 4,
    name: '사과모양 디자인초',
    display_order: 4,
    additional_price: 2000,
  },
  // product_option_id = 4 / 케이크용 보냉가방
  {
    product_option_id: 4,
    name: '없음 (기본)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 4,
    name: '케이크용 보냉가방 추가',
    display_order: 1,
    additional_price: 3000,
  },
  // product_id = 2 / 플라워캐롯케이크
  // product_option_id = 5 / 케이크 사이즈
  {
    product_option_id: 5,
    name: '10cm (기본)',
    display_order: 0,
    additional_price: 0,
  },
  // product_option_id = 6 / 케이크 맛
  {
    product_option_id: 6,
    name: '치즈레이어 당근케이크',
    display_order: 0,
    additional_price: 0,
  },
  // product_option_id = 7 / 디자인초 & 토퍼
  {
    product_option_id: 7,
    name: '없음(기본)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 7,
    name: '플라워 장식',
    display_order: 1,
    additional_price: 15000,
  },
  {
    product_option_id: 7,
    name: '미니 당근 디자인초 세트',
    display_order: 2,
    additional_price: 9000,
  },
  // product_option_id = 8 / 케이크용 보냉가방
  {
    product_option_id: 8,
    name: '없음 (기본)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 8,
    name: '케이크용 보냉가방 추가',
    display_order: 1,
    additional_price: 3000,
  },
  // product_id = 3 / 하트 레터링 케이크
  // product_option_id = 9 / 케이크 사이즈
  {
    product_option_id: 9,
    name: '지름 10cm (기본/ 2~3인용)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 9,
    name: '지름 13cm (3~4인용)',
    display_order: 1,
    additional_price: 4000,
  },
  // product_option_id = 10 / 케이크 맛
  {
    product_option_id: 10,
    name: '라즈베리 바닐라',
    display_order: 0,
    additional_price: 0,
  },
  // product_option_id = 11 / 디자인초 & 토퍼
  {
    product_option_id: 11,
    name: '없음 (기본)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 11,
    name: '은색리본 토퍼',
    display_order: 1,
    additional_price: 2000,
  },
  // product_option_id = 12 / 케이크용 보냉가방
  {
    product_option_id: 12,
    name: '없음 (기본)',
    display_order: 0,
    additional_price: 0,
  },
  {
    product_option_id: 12,
    name: '케이크용 보냉가방 추가',
    display_order: 1,
    additional_price: 3000,
  },
];

export default async function seed(prisma: PrismaClient) {
  console.log(
    '🌱 Products: store_id = 1 상점의 상품옵션 및 선택지 seed 데이터 삽입중...',
  );
  // ProductOptions
  const existingProductOptions = await prisma.productOptions.count({
    where: { product_id: { in: [1, 2, 3] } },
  });
  if (existingProductOptions > 0) {
    console.log(
      '⏭️  이미 store_id = 1 인 상점의 상품옵션 데이터가 존재하여 건너뜁니다.',
    );
  } else {
    await prisma.$transaction(async (tx) => {
      // 순차적으로 삽입
      for (const po of PRODUCT_OPTIONS) {
        await tx.productOptions.create({ data: po });
      }
    });
  }
  // ProductOptionChoices
  const existingProductOptionChoices = await prisma.productOptionChoices.count({
    where: {
      product_option_id: { in: Array.from({ length: 12 }, (_, i) => i + 1) },
    },
  });
  if (existingProductOptionChoices > 0) {
    console.log(
      '⏭️  이미 store_id = 1 인 상점의 상품옵션 선택지 데이터가 존재하여 건너뜁니다.',
    );
  } else {
    await prisma.$transaction(async (tx) => {
      // 순차적으로 삽입
      for (const poc of PRODUCT_OPTION_CHOICES) {
        await tx.productOptionChoices.create({ data: poc });
      }
    });
  }
}
