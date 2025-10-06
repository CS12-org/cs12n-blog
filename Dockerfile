# ------------------------
# 1️⃣ Base image
# ------------------------
FROM node:20-bullseye AS base
WORKDIR /app

RUN npm install -g pnpm

# ------------------------
# 2️⃣ Install dependencies
# ------------------------
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ------------------------
# 3️⃣ Build stage
# ------------------------
# تعریف متغیرها به صورت ARG (از docker-compose پاس داده می‌شن)
ARG NEXT_PUBLIC_API_URL
ARG NEXTAUTH_URL
ARG NEXTAUTH_SECRET

# حالا اونها رو داخل ENV ست می‌کنیم تا Next.js در build ببیندش
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
ENV NODE_ENV=production

COPY . .
RUN pnpm run build

# ------------------------
# 4️⃣ Production runtime
# ------------------------
FROM node:20-bullseye AS runner
WORKDIR /app

RUN npm install -g pnpm
ENV NODE_ENV=production
ENV HUSKY=0

COPY --from=base /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public

EXPOSE 3000
CMD ["pnpm", "start"]
