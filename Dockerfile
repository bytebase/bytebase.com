FROM mhart/alpine-node:slim-14 AS runner
WORKDIR /home/app
ENV NEXT_TELEMETRY_DISABLED 1
COPY .next/standalone ./standalone
COPY public /home/app/standalone/public
COPY .next/static /home/app/standalone/.next/static

EXPOSE 80
ENV PORT 80
CMD [“node”, “./standalone/server.js”]