import { PrismaClient } from '@prisma/client';

const PRODUCT_DESCRIPTIONS = [
  {
    // 스웨이드 베이커리 청담 / 벌스데이 레터링 케이크
    // product_description_id = 1
    product_id: 1,
    requirement_section:
      '📌 픽업 최소 3시간전까지 예약해주세요\n📌 픽업 마감은 오후 7시 50분까지며, 매장 마감(8시 이후)에는 픽업이 불가합니다. 픽업을 못하신 경우, 다음날 오전 10시 이후 수령가능해요.\n📌 한글 10글자/ 영문 20글자 이내\n📌 연출된 초, 토퍼 별도 구매',
    size_section: 'Size: 지름 10cm (2~3인)',
    flavor_options_section:
      '바닐라 시트에 레인보우 스프링클을 더한 사랑스러운 분위기의 버터크림 케이크.',
    product_description_images: null,
  },
  {
    // 스웨이드 베이커리 청담 / 플라워캐롯케이크
    // product_description_id = 2
    product_id: 2,
    requirement_section:
      '더 만족스러운 경험을 드리기 위해 크고 고급스러운 꽃으로 변경하여 업그레이드 되었습니다 🌸',
    size_section: null,
    flavor_options_section: null,
    product_description_images: null,
  },
  {
    // 스웨이드 베이커리 청담 / 하트 레터링 케이크
    // product_description_id = 3
    product_id: 3,
    requirement_section:
      '📌하루 전 예약 필수\n\n새롭게 선보이는\n빈티지 무드의 하트 케이크, 드디어 출시💘\n\n예쁜 레드컬러에\n직접 고른 문구를 담아내는 감성 레터링까지!(20자 이내 문구를 꼭 적어주세요)\n생일, 기념일, 고백까지\n마음을 전할 완벽한 신상케이크🎁\n지금바로 예약하세요!',
    size_section: '사이즈: 지름 13cm (3~4인용)',
    flavor_options_section: '라즈베리 바닐라',
    product_description_images: null,
  },
];

export default async function seed(prisma: PrismaClient) {
  console.log(
    '🌱 Products: store_id = 1 상점의 상품설명 seed 데이터 삽입중...',
  );
  const existingProductDescriptions = await prisma.productDescriptions.count({
    where: { product_id: { in: [1, 2, 3] } },
  });
  if (existingProductDescriptions > 0) {
    console.log(
      '⏭️  이미 store_id = 1 인 상점의 상품설명 데이터가 존재하여 건너뜁니다.',
    );
    return;
  } else {
    await prisma.$transaction(async (tx) => {
      // 순차적으로 삽입
      for (const pd of PRODUCT_DESCRIPTIONS) {
        await tx.productDescriptions.create({
          data: {
            product_id: pd.product_id,
            requirement_section: pd.requirement_section,
            size_section: pd.size_section,
            flavor_options_section: pd.flavor_options_section,
          },
        });
      }
    });
    console.log('✅ store_id = 1 인 상점의 상품설명 데이터 삽입 완료.');
  }
}
