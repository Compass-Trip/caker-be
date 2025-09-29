# Base image
FROM node:22-alpine

# corepack 활성화 (yarn 사용을 위해)
RUN corepack enable && corepack prepare yarn@1 --activate

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 yarn.lock 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install --frozen-lockfile

# 소스코드 복사
COPY . .

# NestJS 빌드
RUN yarn build

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
CMD ["node", "dist/main"]