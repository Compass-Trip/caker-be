import { PrismaClient } from '@prisma/client';

const PRODUCTS = [
  // store_id = 1 / 스웨이드 베이커리 청담
  {
    // product_id = 1
    store_id: BigInt(1),
    name: '벌스데이 레터링 케이크',
    price: 30000,
    representative_image_url:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20251001_159%2F1759303859542oL9sE_JPEG%2FE88DC12A-17B7-4D1A-AD93-334B9F0ADE49_1_105_c.jpeg',
    discount_percent: null,
    event_category_id: 1, // 이벤트카테고리 FK
  },
  {
    // product_id = 2
    store_id: BigInt(1),
    name: '플라워캐롯 케이크',
    price: 30000,
    representative_image_url:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20251001_29%2F1759303386911CIXtg_JPEG%2FIMG_7358.jpg',
    discount_percent: null,
    event_category_id: 10, // 이벤트카테고리 FK
  },
  {
    // product_id = 3
    store_id: BigInt(1),
    name: '하트 레터링 케이크',
    price: 24000,
    representative_image_url:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250726_282%2F1753511118814J1YtR_JPEG%2FIMG_3542.jpg',
    discount_percent: null,
    event_category_id: 4, // 이벤트카테고리 FK
  },
];

const PRODUCT_THEME_AND_DESIGN_CATEGORIES = [
  // store_id = 1 / 스웨이드 베이커리 청담
  // product_id = 1 / 벌스데이 레터링 케이크
  {
    product_id: 1,
    theme_n_design_category_id: 1, // 큐트
  },
  {
    product_id: 1,
    theme_n_design_category_id: 2, // 미니멀/모던
  },
  // product_id = 2 / 플라워캐롯 케이크
  {
    product_id: 2,
    theme_n_design_category_id: 3, // 프리미엄/럭셔리
  },
  {
    product_id: 2,
    theme_n_design_category_id: 5, // 내추럴/오가닉
  },
  // product_id = 3 / 하트 레터링 케이크
  {
    product_id: 3,
    theme_n_design_category_id: 1, // 큐트
  },
  {
    product_id: 3,
    theme_n_design_category_id: 2, // 미니멀/모던
  },
  {
    product_id: 3,
    theme_n_design_category_id: 3, // 프리미엄/럭셔리
  },
];

export default async function seed(prisma: PrismaClient) {
  console.log('🌱 Products: store_id = 1 상점의 상품 seed 데이터 삽입중...');
  const existingProducts = await prisma.products.count({
    where: { store_id: 1 },
  });
  if (existingProducts > 0) {
    console.log(
      '⏭️  이미 store_id = 1 인 상점의 상품 데이터가 존재하여 건너뜁니다.',
    );
    return;
  } else {
    await prisma.$transaction(async (tx) => {
      // 순차적으로 삽입
      for (const product of PRODUCTS) {
        await tx.products.create({ data: product });
      }

      for (const ptdc of PRODUCT_THEME_AND_DESIGN_CATEGORIES) {
        await tx.productsAndThemeNDesignCategories.create({ data: ptdc });
      }
    });

    console.log(
      '✅ store_id = 1 인 상점의 상품 seed 데이터 삽입이 완료되었습니다.',
    );
  }
}
