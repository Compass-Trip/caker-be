import { PrismaClient } from '@prisma/client';

/** 00:00 ~ 23:30 30분 간격으로 시간데이터 */
export default async function seed(prisma: PrismaClient) {
  console.log('🌱 TimeSlots: 타임슬롯 카테고리 데이터 삽입중...');

  const existingCount = await prisma.timeSlots.count();
  if (existingCount > 0) {
    console.log('⏭️  이미 TimeSlots 데이터가 존재하여 건너뜁니다.');
    return;
  }

  // 0:00 ~ 23:30 까지 30분 간격으로 생성
  // 데이터베이스의 타임존이 UTC이기때문에 UTC기준으로 순서정렬
  const timeSlots: Date[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = new Date(Date.UTC(2000, 0, 1, hour, minute, 0, 0));
      timeSlots.push(time);
    }
  }
  // 데이터 삽입
  await prisma.$transaction(async (tx) => {
    for (let i = 0; i < timeSlots.length; i++) {
      const ts = timeSlots[i];
      await tx.timeSlots.create({
        data: {
          time24: ts,
        },
      });
    }
  });

  console.log(
    `✅ TimeSlots: ${timeSlots.length}개의 TimeSlot(00:00 ~ 23:30) 데이터 추가완료`,
  );
}
